import create from 'zustand'
import { ITransactionRecord } from '../models/TransactionRecord.model'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import shallow from 'zustand/shallow'
import { IMember } from '../models/Member.model'
import { validateUniqueMember } from '../util/validation/memberValidation'

interface GlobalState {
  transactionRecords: Array<ITransactionRecord>
  totalBudget: number
  addTransactionRecord: (record: ITransactionRecord) => void
  removeTransactionRecord: (id: number) => void

  members: Array<IMember>
  addMember: (member: IMember) => Promise<boolean>
  removeMember: (id: string) => void
}

// Globale store declaration
const useStore = create<GlobalState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      transactionRecords: [],
      totalBudget: 0,
      addTransactionRecord: (record) => set(state => ({ transactionRecords: [...state.transactionRecords, record] })),
      removeTransactionRecord: (id) => set(state => ({ transactionRecords: state.transactionRecords.filter(record => record.id !== id) })),

      members: [],
      addMember: (member) => {
        return new Promise((resolve, reject) => {
          if (validateUniqueMember(get().members, member)) {
            set(state => ({ members: [...state.members, member] }))
            resolve(true);
          }
          else {
            reject(false);
          }
        })
      },
      removeMember: (id) => set(state => ({ members: state.members.filter(member => member.id !== id) }))
    }))))

useStore.subscribe(
  state => [state.transactionRecords], //deps, only compute when a & b change
  ([transactionRecords]) => {
    useStore.setState({ totalBudget: transactionRecords.reduce((accm, a) => accm + a.amount, 0) });
  },
  { equalityFn: shallow, fireImmediately: true }
)

