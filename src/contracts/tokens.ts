export const STRK_DECIMALS = 18;

export function formatTokenAmount(amount: bigint, decimals: number = STRK_DECIMALS): string {
    const divisor = BigInt(10 ** decimals);
    const integerPart = amount / divisor;
    const fractionalPart = amount % divisor;
    
    // Convert fractional part to string and pad with leading zeros
    let fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    
    // Remove trailing zeros
    fractionalStr = fractionalStr.replace(/0+$/, '');
    
    // If there's no fractional part after removing zeros, just return the integer part
    if (!fractionalStr) {
        return integerPart.toString();
    }
    
    return `${integerPart}.${fractionalStr}`;
} 