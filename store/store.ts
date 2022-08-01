import create from 'zustand'
import { ITransactionRecord } from '../models/ITransactionRecord'

interface GlobalState {
    transactionRecords: Array<ITransactionRecord>
    addTransactionRecord: (record: ITransactionRecord) => void
    removeTransactionRecord: (id: number) => void
}

export const useStore = create<GlobalState>(set => ({
    transactionRecords: [],
    addTransactionRecord: (record) => set(state => ({transactionRecords: [...state.transactionRecords, record]})),
    removeTransactionRecord: (id) => set(state => ({transactionRecords: state.transactionRecords.filter(record => record.id !== id)}))
}))