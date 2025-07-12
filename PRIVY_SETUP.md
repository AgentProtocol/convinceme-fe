# Privy Integration Setup Guide

This document explains how to set up and use the Privy social authentication integration for ConvinceMe.

## Overview

We've replaced the previous Argent/Ready wallet authentication with Privy's social login system. Users can now sign in using:

- Google
- Twitter/X
- Discord
- GitHub
- Apple
- Email (with OTP)

## Environment Variables

Create a `.env` file in the `convinceme-fe` directory with the following variables:

```env
# Privy Configuration
VITE_PRIVY_APP_ID=your-privy-app-id-here

# API Configuration
VITE_API_URL=http://localhost:8080
VITE_WEBSOCKET_URL=ws://localhost:8080

# Other Configuration
VITE_SKIP_TRANSACTIONS=true
```

## Getting Your Privy App ID

1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Create a new app or select an existing one
3. Copy your App ID from the dashboard
4. Add it to your `.env` file as `VITE_PRIVY_APP_ID`

## Configuration

The Privy configuration is set up in `src/main.tsx` with the following options:

- **Login Methods**: Google, Twitter, Discord, GitHub, Apple, Email
- **Theme**: Light theme with blue accent color
- **Embedded Wallets**: Automatically creates wallets for users without wallets
- **Logo**: ConvinceMe logo

## Changes Made

### Components Updated

1. **LoginButton**: Now uses Privy's `login()` function instead of Starknet wallet connection
2. **GameUI**: Uses Privy's `user` object instead of Starknet's `address`
3. **ArgumentInput**: Simplified to remove blockchain transaction logic
4. **TopicSelectionPage**: Updated to use Privy authentication
5. **ScoreBar**: Removed blockchain-related prize pot display

### Files Removed

- `src/contexts/StarknetProvider.tsx` - Replaced with Privy
- `src/contracts/` - Entire directory removed (no longer needed)

### Dependencies Updated

- **Removed**: `@starknet-react/chains`, `@starknet-react/core`, `starknet`, `starknetkit`
- **Added**: `@privy-io/react-auth`

## User Authentication Flow

1. User clicks "Sign In" button
2. Privy modal opens with social login options
3. User selects preferred authentication method
4. User is authenticated and can participate in debates
5. User info is displayed in top-left corner with logout option

## User Object Structure

The Privy user object contains:

- `user.id` - Unique user identifier
- `user.email?.address` - Email address (if email login)
- `user.google?.email` - Google email (if Google login)
- `user.twitter?.username` - Twitter username (if Twitter login)
- `user.discord?.username` - Discord username (if Discord login)
- `user.github?.username` - GitHub username (if GitHub login)

## Development

To run the development server:

```bash
cd convinceme-fe
pnpm install
pnpm dev
```

Make sure to set up your `.env` file with the correct Privy App ID before running the application.

## Production Deployment

For production deployment, make sure to:

1. Set the correct `VITE_PRIVY_APP_ID` in your production environment
2. Configure your Privy app's allowed domains in the Privy dashboard
3. Update API URLs to point to your production backend

## Support

If you encounter any issues with the Privy integration:

1. Check the [Privy Documentation](https://docs.privy.io)
2. Verify your App ID is correct
3. Ensure your domain is whitelisted in the Privy dashboard
4. Check browser console for any error messages
