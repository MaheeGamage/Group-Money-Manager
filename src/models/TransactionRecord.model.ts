export interface ITransactionRecord {
    id: number;
    type: TransactionType;
    amount: number;
    memberId: string;
    description?: string;
}

export enum TransactionType {
    EXPENSE = 'Expense',
    TRANSFER = 'Transfer',
}