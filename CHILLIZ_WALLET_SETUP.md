# Chilliz Wallet Integration with ContractMe

This guide explains how to use the Chilliz wallet integration in ConvinceMe for ContractMe smart contract interactions with buy-in functionality.

## Overview

The application now supports automatic wallet creation on the Chilliz network for each user, enabling them to interact with the ContractMe smart contract. This integration uses Privy's embedded wallet functionality and implements a buy-in system where users pay to submit arguments, contributing to a prize pool.

## Contract Details

**Contract Address:** `0x3cFcddEd8A7cFeb0e337BdbD8aE97bC88C283a3A`  
**Network:** Chilliz Spicy Testnet (ID: 88882)  
**Explorer:** [View on Chilliz Explorer](https://spicy-explorer.chiliz.com/address/0x3cFcddEd8A7cFeb0e337BdbD8aE97bC88C283a3A/contracts)

## How It Works

### Buy-In System

- Users must pay a buy-in cost to submit arguments
- Cost starts at a base fee and increases logarithmically with each buy-in
- Formula: `cost = baseFee * (1 + floor(log2(buyInCount + 1)))`
- All buy-ins contribute to the prize pool

### Prize Pool

- Accumulates from user buy-ins
- Can be additionally funded by anyone
- Managed by the contract owner for payouts

## Setup

### 1. Network Configuration

The app is configured to work with:

- **Chilliz Spicy Testnet** (ID: 88882) - Default for testing
- **Chilliz Mainnet** (ID: 88888) - For production use

### 2. Automatic Wallet Creation

Users get wallets automatically created when they log in:

```typescript
embeddedWallets: {
  createOnLogin: 'users-without-wallets',
  requireUserPasswordOnCreate: false,
}
```

### 3. Required Dependencies

- `@privy-io/react-auth` - For authentication and wallet management
- `ethers` - For blockchain interactions

## Components

### WalletManager Component

Location: `src/components/WalletManager.tsx`

Features:

- Displays wallet address and CHZ balance
- Switch to Chilliz network
- Refresh balance
- Network switching with automatic network addition

### ContractMeDisplay Component

Location: `src/components/ContractMeDisplay.tsx`

Features:

- Shows current buy-in cost
- Displays prize pool amount
- Shows total buy-ins and statistics
- Buy-in functionality
- Prize pool funding option

### ArgumentInput Component

Location: `src/components/ArgumentInput.tsx`

Features:

- Integrated buy-in process
- Shows current cost before submission
- Handles both buy-in and argument submission
- Real-time cost updates

### ContractMe Service

Location: `src/services/escrowService.ts`

Features:

- TypeScript service for ContractMe interactions
- Buy-in functionality
- Prize pool management
- Cost calculation utilities

## Usage

### 1. User Authentication

Users can log in using social accounts (Twitter, Google, Discord, GitHub, Email). Upon login, an embedded wallet is automatically created.

### 2. Accessing Contract Features

Navigate to the Topic Selection page to see:

- Wallet information panel
- CHZ balance display
- Network switching options
- ContractMe functionality

### 3. Submitting Arguments with Buy-In

1. Select a debate topic
2. Join the debate
3. In the argument input area, you'll see:
   - Current buy-in cost
   - Argument text area
   - Side selection buttons
4. Enter your argument and click a side button
5. The system will:
   - Automatically perform the buy-in transaction
   - Submit your argument to the debate
   - Update the prize pool

### 4. Viewing Contract Information

1. Click "View Contract Info" to see:
   - Current buy-in cost
   - Prize pool amount
   - Total buy-ins
   - Base fee information

### 5. Funding the Prize Pool

1. In the Contract Info section
2. Enter an amount in CHZ
3. Click "Fund" to add to the prize pool

## Smart Contract Functions

### Core Functions

- `buyIn()` - Pay current cost to participate
- `actionCost()` - Get current buy-in cost
- `prizePoolAmount()` - Get current prize pool
- `totalBuyIns()` - Get total number of buy-ins
- `fundPrizePool()` - Add funds to prize pool
- `baseFee()` - Get base fee amount

### Events

- `BuyIn(address user, uint256 cost, uint256 buyInNumber)` - Emitted on buy-in
- `PrizeFunded(address funder, uint256 amount)` - Emitted on prize funding
- `Payout(address recipient, uint256 amount)` - Emitted on payout

## Testing

### Getting Test Tokens

1. Get CHZ tokens from the Chilliz Spicy Testnet faucet
2. Ensure you have enough CHZ for:
   - Buy-in costs (starts low, increases with participation)
   - Gas fees for transactions

### Testing Flow

1. Log in with any social account
2. Wallet should be created automatically
3. Click "Switch to Chilliz" to connect to the network
4. Navigate to debates
5. Test argument submission with buy-in
6. Verify transactions on Chilliz Explorer

## Cost Calculation

The buy-in cost increases logarithmically:

```
Current Cost = Base Fee × (1 + floor(log₂(Total Buy-ins + 1)))
```

Examples (assuming 0.01 CHZ base fee):

- 1st buy-in: 0.01 CHZ
- 2nd buy-in: 0.02 CHZ
- 3rd buy-in: 0.02 CHZ
- 4th buy-in: 0.03 CHZ
- 8th buy-in: 0.04 CHZ

## Common Issues

### 1. Wallet Not Created

- Ensure user is logged in
- Check Privy configuration
- Refresh the page

### 2. Network Connection Issues

- Verify network configuration
- Check RPC endpoints
- Try switching networks manually

### 3. Buy-In Transaction Errors

- Check CHZ balance is sufficient
- Verify current buy-in cost
- Ensure gas fees are covered

### 4. Contract Interaction Errors

- Verify contract address is correct
- Check network connectivity
- Confirm transaction parameters

## Development Notes

### Adding New Features

1. Update the `ContractMeService` class with new methods
2. Add corresponding UI components
3. Update the ABI if contract changes
4. Test thoroughly on testnet

### Cost Monitoring

The system automatically:

- Loads current costs when components mount
- Refreshes costs after successful buy-ins
- Shows real-time cost to users

### Transaction Management

- All transactions use appropriate gas limits
- Success/error states are properly handled
- Users receive immediate feedback

## Security Considerations

1. **Test First**: Always test on Chilliz Spicy Testnet
2. **Validate Amounts**: Verify buy-in costs before transactions
3. **Check Balances**: Ensure sufficient CHZ for buy-ins and gas
4. **Monitor Costs**: Buy-in costs increase with participation
5. **Contract Verification**: Contract is verified on Chilliz Explorer

## Support

For questions or issues:

1. Check the browser console for error messages
2. Verify network connectivity
3. Review transaction details on Chilliz Explorer
4. Check contract state on the explorer

## Resources

- [Contract on Chilliz Explorer](https://spicy-explorer.chiliz.com/address/0x3cFcddEd8A7cFeb0e337BdbD8aE97bC88C283a3A/contracts)
- [Privy Documentation](https://docs.privy.io/)
- [Chilliz Spicy Explorer](https://spicy-explorer.chiliz.com)
- [Chilliz Developer Docs](https://docs.chiliz.com/)
- [Ethers.js Documentation](https://docs.ethers.io/)

## Contract Owner Functions

The contract owner can:

- Execute payouts from the prize pool
- Manage prize distribution
- Monitor contract state

Note: Regular users cannot execute payouts - this is restricted to the contract owner for security.
