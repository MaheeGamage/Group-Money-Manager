export interface ITransactionRecord {
    id: number;
    type: TransactionType;
    amount: number;
    memberId: string;
    description?: string;
}

export interface IBudgetCalculationResult {
    memberId: string;
    member: string;
    amount: number;
}

export enum TransactionType {
    PAID = "Paid",
    UNPAID = "Unpaid",
}