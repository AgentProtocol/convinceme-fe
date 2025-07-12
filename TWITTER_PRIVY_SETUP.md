# Twitter/X Social Login with Privy - Setup Guide

## Overview

This guide will help you set up Twitter/X social login for your ConvinceMe app using Privy.

## Prerequisites

- Privy account and app created
- Twitter Developer account

## Step 1: Complete Privy App Setup

### 1.1 Get Your Complete Privy App ID

1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Select your app (or create a new one)
3. Copy the complete App ID from the dashboard
4. Update your `.env` file with the complete App ID:

```env
VITE_PRIVY_APP_ID=your-complete-app-id-here
```

**Note:** Your current App ID appears incomplete - make sure you get the full ID from the dashboard.

### 1.2 Configure Domain Settings

In your Privy dashboard:

1. Go to **Settings** → **Basics**
2. Add your allowed domains:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (for Vite dev server)
   - Your production domain when deploying

## Step 2: Set Up Twitter Developer Account

### 2.1 Create Twitter Developer Account

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Sign in with your Twitter account
3. Apply for a developer account (if you don't have one)
4. Wait for approval (usually instant for basic access)

### 2.2 Create a Twitter App

1. In the Twitter Developer Portal, click **+ Create App**
2. Fill in the app details:
   - **App name**: ConvinceMe (or your preferred name)
   - **Description**: Debate platform for structured discussions
   - **Website URL**: Your domain or `https://example.com` for testing
   - **Terms of Service**: Your terms URL or leave blank for testing
   - **Privacy Policy**: Your privacy URL or leave blank for testing

### 2.3 Configure OAuth 2.0 Settings

1. Go to your app's settings
2. Click on **User authentication settings**
3. Click **Set up** to configure OAuth 2.0
4. Configure the settings:
   - **App permissions**: Read
   - **Type of App**: Web App
   - **App info**:
     - **Callback URI**: `https://auth.privy.io/api/v1/oauth/callback`
     - **Website URL**: Your domain
   - **Organization**: Your organization name

### 2.4 Get Your Twitter App Credentials

1. Go to **Keys and tokens**
2. Copy your:
   - **Client ID** (OAuth 2.0)
   - **Client Secret** (OAuth 2.0)

## Step 3: Configure Twitter in Privy Dashboard

### 3.1 Add Twitter OAuth Credentials

1. In your Privy dashboard, go to **Configuration** → **Login methods**
2. Find **Twitter** and click **Configure**
3. Enter your Twitter app credentials:
   - **Client ID**: Your Twitter OAuth 2.0 Client ID
   - **Client Secret**: Your Twitter OAuth 2.0 Client Secret
4. Click **Save**

### 3.2 Enable Twitter Login

1. Make sure the **Twitter** toggle is enabled in the login methods
2. Save your configuration

## Step 4: Test the Integration

### 4.1 Start Your Development Server

```bash
cd convinceme-fe
pnpm dev
```

### 4.2 Test Twitter Login

1. Open your app in the browser
2. Click the "Sign In" button
3. You should see Twitter as an option in the Privy modal
4. Click Twitter and complete the OAuth flow

## Troubleshooting

### Common Issues:

**1. "App ID not found" error**

- Make sure your `VITE_PRIVY_APP_ID` is complete and correct
- Restart your dev server after updating the environment variable

**2. "Redirect URI mismatch" error**

- Ensure the callback URI in Twitter is exactly: `https://auth.privy.io/api/v1/oauth/callback`
- Check that your domain is added to Privy's allowed domains

**3. "Twitter app not configured" error**

- Make sure you've added your Twitter credentials in the Privy dashboard
- Verify that Twitter login is enabled in Privy configuration

**4. "Invalid client" error**

- Double-check your Twitter OAuth 2.0 Client ID and Secret
- Make sure you're using OAuth 2.0 credentials, not OAuth 1.0a

**5. Social login buttons not appearing**

- Check browser console for errors
- Verify your Privy configuration in `main.tsx`
- Make sure 'twitter' is in the `loginMethods` array

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded: `console.log(import.meta.env.VITE_PRIVY_APP_ID)`
3. Check Privy dashboard for any configuration warnings
4. Test with other social logins (Google, Discord) to isolate the issue

## Next Steps

Once Twitter login is working:

1. Test other social logins (Google, Discord, GitHub)
2. Configure production domains in both Privy and Twitter
3. Set up proper error handling for failed logins
