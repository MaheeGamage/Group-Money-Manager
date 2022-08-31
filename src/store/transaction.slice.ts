import create, { StateCreator, useStore } from 'zustand'
import { ITransactionRecord } from '../models/TransactionRecord.model'
import { subscribeWithSelector } from 'zustand/middleware'
import shallow from 'zustand/shallow'
import { MemberSlice, TransactionRecordSlice } from './store.model'

export const createTransactionSlice: StateCreator<
  MemberSlice & TransactionRecordSlice,
  [["zustand/subscribeWithSelector", never]],
  [],
  TransactionRecordSlice
> = (set) => ({
  transactionRecords: [],
  totalBudget: 0,
  addTransactionRecord: (record) => set(state => ({ transactionRecords: [...state.transactionRecords, record] })),
  removeTransactionRecord: (id) => set(state => ({ transactionRecords: state.transactionRecords.filter(record => record.id !== id) }))
})

