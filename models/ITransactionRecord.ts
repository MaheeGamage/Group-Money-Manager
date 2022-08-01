export interface ITransactionRecord {
    id: number;
    type: string;
    amount: number;
    person: string;
    description?: string;
}