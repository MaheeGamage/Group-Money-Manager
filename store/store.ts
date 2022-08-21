import create from 'zustand'
import { ITransactionRecord } from '../models/TransactionRecord.model'

interface GlobalState {
    transactionRecords: Array<ITransactionRecord>
    addTransactionRecord: (record: ITransactionRecord) => void
    removeTransactionRecord: (id: number) => void
}

// Globale store declaration
export const useStore = create<GlobalState>(set => ({
    transactionRecords: [],
    addTransactionRecord: (record) => set(state => ({transactionRecords: [...state.transactionRecords, record]})),
    removeTransactionRecord: (id) => set(state => ({transactionRecords: state.transactionRecords.filter(record => record.id !== id)}))
}))