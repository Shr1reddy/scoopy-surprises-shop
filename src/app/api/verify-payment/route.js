import crypto from 'crypto';
import twilio from 'twilio';

/**
 * Verify Razorpay payment signature & send WhatsApp notification.
 */
export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
      total,
    } = await request.json();

    // ── 1. Verify Razorpay signature ─────────────────────────────────────────
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Signature mismatch — possible tampered request');
      return Response.json({ success: false, error: 'Payment verification failed' }, { status: 400 });
    }

    // ── 2. Send WhatsApp notification to owner ────────────────────────────────
    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

      const scoopLabel = {
        mini: '🍦 Mini Scoop (₹299)',
        regular: '🍨 Regular Scoop (₹599)',
        premium: '🎁 Premium Scoop (₹999)',
      }[orderDetails.scoopType] || orderDetails.scoopType;

      const packingLabel = {
        normal: '🎀 Normal Packing (₹149)',
        box: '📦 Box Packaging (₹199)',
      }[orderDetails.packingType] || orderDetails.packingType;

      const message = [
        '🛍️ *New Scoopy Surprises Order!*',
        '',
        `📦 *Scoop:* ${scoopLabel}`,
        `🎁 *Packing:* ${packingLabel}`,
        `🎥 *Video:* ${orderDetails.includeVideo ? 'Yes (+₹50)' : 'No'}`,
        '',
        '👤 *Customer Details*',
        `Name: ${orderDetails.name}`,
        `Age: ${orderDetails.age}`,
        `Phone: +91 ${orderDetails.phone}`,
        `Address: ${orderDetails.address}`,
        orderDetails.specialInstructions
          ? `Instructions: ${orderDetails.specialInstructions}`
          : '',
        '',
        `💰 *Total Paid: ₹${total}*`,
        `🔑 Payment ID: ${razorpay_payment_id}`,
        `📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
      ]
        .filter(Boolean)
        .join('\n');

      await client.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.OWNER_WHATSAPP_NUMBER,
      });

      console.log('WhatsApp notification sent successfully');
    } catch (waErr) {
      // Don't fail the payment if WhatsApp notification fails — log it instead
      console.error('WhatsApp notification error:', waErr.message);
    }

    // ── 3. Return success ─────────────────────────────────────────────────────
    return Response.json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('verify-payment error:', err);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
