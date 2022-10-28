export interface ITransactionRecord {
    id: number;
    type: TransactionType;
    amount: number;
    memberId: string;
    description?: string;
}

export enum TransactionType {
    PAID = "Paid",
    UNPAID = "Unpaid",
    SPECIAL_DEDUCTION = "SpecialDeduction",
}