import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, orderDetails } = await request.json();

    if (!amount || amount < 1) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Create Razorpay order (amount must be in paise)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `scoopy_${Date.now()}`,
      notes: {
        customer_name: orderDetails?.name || '',
        customer_phone: orderDetails?.phone || '',
        scoop_type: orderDetails?.scoopType || '',
        packing_type: orderDetails?.packingType || '',
        include_video: String(orderDetails?.includeVideo || false),
      },
    });

    return Response.json({ orderId: order.id });
  } catch (err) {
    console.error('Razorpay create-order error:', err);
    return Response.json(
      { error: 'Failed to create payment order. Please try again.' },
      { status: 500 }
    );
  }
}
