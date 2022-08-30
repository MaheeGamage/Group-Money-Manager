import create from 'zustand'
import { ITransactionRecord } from '../models/TransactionRecord.model'
import { subscribeWithSelector } from 'zustand/middleware'
import shallow from 'zustand/shallow'
import { IMember } from '../models/Member.model'

interface GlobalState {
    transactionRecords: Array<ITransactionRecord>
    totalBudget: number
    addTransactionRecord: (record: ITransactionRecord) => void
    removeTransactionRecord: (id: number) => void

    members: Array<IMember>
    addMember: (member: IMember) => void
    removeMember: (id: number) => void
}

// Globale store declaration
export const useStore = create<GlobalState>()(subscribeWithSelector((set) => ({
    transactionRecords: [],
    totalBudget: 0,
    addTransactionRecord: (record) => set(state => ({transactionRecords: [...state.transactionRecords, record]})),
    removeTransactionRecord: (id) => set(state => ({transactionRecords: state.transactionRecords.filter(record => record.id !== id)})),

    members: [],
    addMember: (member) => set(state => ({members: [...state.members, member]})),
    removeMember: (id) => set(state => ({members: state.members.filter(member => member.id !== id)}))
})))

useStore.subscribe(
    state => [state.transactionRecords], //deps, only compute when a & b change
    ([transactionRecords]) => {
      useStore.setState({ totalBudget: transactionRecords.reduce((accm, a) => accm + a.amount, 0) });
    },
    { equalityFn: shallow, fireImmediately: true }
  )

