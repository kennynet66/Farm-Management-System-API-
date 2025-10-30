class MoneyFormatter {
    formatKES(amount: number): string {
        if (amount < 100_000) {
            // Show full number with commas
            return `KES ${amount.toLocaleString("en-US")}`;
        } else if (amount < 1_000_000) {
            // Thousands with one decimal
            return `KES ${(amount / 1_000).toFixed(1)}K`;
        } else if (amount < 1_000_000_000) {
            // Millions with one decimal
            return `KES ${(amount / 1_000_000).toFixed(1)}M`;
        } else {
            // Billions with one decimal
            return `KES ${(amount / 1_000_000_000).toFixed(1)}B`;
        }
    }
}

export const moneyFormatter = new MoneyFormatter();