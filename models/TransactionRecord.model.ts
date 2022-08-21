export interface ITransactionRecord {
    id: number;
    type: TransactionType;
    amount: number;
    person: string;
    description?: string;
}

export enum TransactionType {
    EXPENSE = 'Expense',
    TRANSFER = 'Transfer',
}