# Scoopy Surprises — Setup Guide

## 1. Create a `.env.local` file

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

---

## 2. Razorpay Setup

1. Go to https://dashboard.razorpay.com/app/keys
2. Sign up / log in
3. Under **Settings → API Keys**, generate a key pair
4. For testing, use **Test Mode** keys (prefix `rzp_test_`)
5. Add to `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
   RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
   ```

> When you're ready to accept real payments, switch to **Live Mode** keys.

---

## 3. Twilio WhatsApp Setup

### 3a. Create Twilio account
1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free trial
3. From your Console Dashboard, note your **Account SID** and **Auth Token**

### 3b. Set up WhatsApp Sandbox (for testing)
1. In Twilio Console → **Messaging → Try WhatsApp**
2. Follow the steps to join the sandbox (send a WhatsApp message to their number)
3. The **From** number for sandbox is: `whatsapp:+14155238886`

### 3c. Update `.env.local`
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
OWNER_WHATSAPP_NUMBER=whatsapp:+91XXXXXXXXXX   ← your WhatsApp Business number
```

---

## 4. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 5. Deploy to Vercel

### One-time setup
```bash
npm install -g vercel
vercel login
```

### Deploy
```bash
vercel --prod
```

Add all environment variables from `.env.local` in the Vercel dashboard:
**Project → Settings → Environment Variables**

---

## 6. Publish to GitHub

```bash
cd scoopy-surprises-shop
git init
git add .
git commit -m "Initial commit: Scoopy Surprises order app"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/scoopy-surprises-shop.git
git push -u origin main
```

Then connect the GitHub repo in Vercel for automatic deployments on every push.
