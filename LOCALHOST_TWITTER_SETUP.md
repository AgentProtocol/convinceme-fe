# Twitter OAuth Localhost Setup - Official Solution

## 🚨 **The Problem**

Twitter's Developer Portal rejects `http://localhost:5173` as a website URL with "invalid website url" error.

## ✅ **Official Twitter Solution**

According to [Twitter's official documentation](https://developer.x.com/en/docs/apps/callback-urls):

> **"Don't use localhost as a callback URL"**  
> Instead of using localhost, please use a custom host locally or **http(s)://127.0.0.1**

## 🛠️ **Setup Instructions**

### **Step 1: Use 127.0.0.1 in Twitter Settings**

In your Twitter Developer Portal → App Settings:

**✅ Website URL:**

```
http://127.0.0.1:5174
```

**✅ Callback URI:**

```
https://auth.privy.io/api/v1/oauth/callback
```

**Important Notes:**

- Use `127.0.0.1` instead of `localhost`
- Use your actual port number (5174 in your case, since 5173 was taken)
- The callback URI stays the same (Privy's URL)

### **Step 2: Update Your Privy Dashboard**

In Privy Dashboard → Settings → Basics, add these domains:

```
✅ http://127.0.0.1:5174
✅ http://127.0.0.1:5173
✅ http://127.0.0.1:3000
✅ Your production domain when ready
```

### **Step 3: Update Your Local Development**

Your app should work with both `localhost` and `127.0.0.1`. Test both:

**Option A: Use localhost (recommended)**

```bash
# Your current setup
cd convinceme-fe
pnpm dev
# Opens on http://localhost:5174
```

**Option B: Force 127.0.0.1**

```bash
# If you want to match exactly
cd convinceme-fe
pnpm dev --host 127.0.0.1
```

### **Step 4: Complete Twitter App Configuration**

**App Details:**

```
✅ App name: ConvinceMe
✅ App description: Debate platform for structured discussions
✅ Website URL: http://127.0.0.1:5174
✅ Terms of Service: [Your URL or leave blank for testing]
✅ Privacy Policy: [Your URL or leave blank for testing]
```

**User Authentication Settings:**

```
✅ OAuth 2.0: ENABLED ← Critical!
✅ Type of App: Web App
✅ App permissions: Read
✅ Callback URI: https://auth.privy.io/api/v1/oauth/callback
```

**Get OAuth 2.0 Credentials:**

1. Go to **Keys and tokens** tab
2. Look for **OAuth 2.0 Client ID and Client Secret**
3. Copy these to your Privy dashboard

## 🧪 **Testing Protocol**

### **Method 1: Direct Access**

1. Open `http://127.0.0.1:5174` in your browser
2. Click "Sign In"
3. Try Twitter login

### **Method 2: Localhost Redirect**

1. Open `http://localhost:5174` in your browser
2. The OAuth should still work (backend uses Privy's callback)

## 🔧 **Alternative Solutions**

### **Option 1: Use a Custom Local Domain**

Add to your `/etc/hosts` file:

```
127.0.0.1   convince.local
```

Then use:

- **Website URL:** `http://convince.local:5174`
- **Access your app:** `http://convince.local:5174`

### **Option 2: Use ngrok for HTTPS**

```bash
# Install ngrok
npm install -g ngrok

# Start your app
pnpm dev

# In another terminal, expose it
ngrok http 5174
```

Use the ngrok HTTPS URL in Twitter settings:

- **Website URL:** `https://abc123.ngrok.io`

## 📋 **Final Configuration Checklist**

### **Twitter Developer Portal:**

- ✅ Website URL: `http://127.0.0.1:5174`
- ✅ OAuth 2.0: Enabled
- ✅ Type of App: Web App
- ✅ App permissions: Read
- ✅ Callback URI: `https://auth.privy.io/api/v1/oauth/callback`

### **Privy Dashboard:**

- ✅ Twitter login method: Enabled
- ✅ OAuth 2.0 Client ID: [Your Twitter Client ID]
- ✅ OAuth 2.0 Client Secret: [Your Twitter Client Secret]
- ✅ Allowed domains: Include `http://127.0.0.1:5174`

### **Your .env File:**

```env
VITE_PRIVY_APP_ID=your-complete-privy-app-id
VITE_API_URL=http://localhost:8080
VITE_WEBSOCKET_URL=ws://localhost:8080
```

## 🎯 **Why This Works**

1. **Twitter's Restriction:** Twitter blocks `localhost` for security reasons
2. **127.0.0.1 Solution:** This is the IP address equivalent of localhost
3. **OAuth Flow:** The actual OAuth flow uses Privy's callback URL, not your local URL
4. **Browser Compatibility:** All browsers treat `127.0.0.1` and `localhost` identically

## 🚀 **Test Your Setup**

1. **Start your dev server:**

   ```bash
   cd convinceme-fe
   pnpm dev
   ```

2. **Access via 127.0.0.1:**

   ```
   http://127.0.0.1:5174
   ```

3. **Try Twitter login** - it should work now!

## 💡 **Pro Tips**

- **Both URLs work:** You can access your app via both `localhost:5174` and `127.0.0.1:5174`
- **OAuth is independent:** The OAuth flow happens through Privy's servers
- **Port flexibility:** Use whatever port Vite assigns (5173, 5174, etc.)
- **Production ready:** When deploying, just update the website URL to your real domain

This solution follows Twitter's official recommendations and should resolve your localhost restriction issue!
