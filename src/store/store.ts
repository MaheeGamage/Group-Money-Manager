import { resolve } from "path";
import create from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import shallow from "zustand/shallow";
import { createMemberSlice } from "./member.slice";
import { GlobalState, MemberSlice, TransactionRecordSlice } from "./store.model";
import { createTransactionSlice } from "./transaction.slice";


// This store is created using the zustand library.
export const useStore = create<GlobalState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (...a) => ({
          ...createMemberSlice(...a),
          ...createTransactionSlice(...a)
        }),
        {
          name: 'budget-storage',
        }
      )
    )
  )
)

// Middleware is used to subscribe to each transaction and update the total budget.
useStore.subscribe(
  state => [state.transactionRecords],
  ([transactionRecords]) => {
    useStore.setState({ totalBudget: transactionRecords.reduce((accm, a) => accm + a.amount, 0) });
  },
  { equalityFn: shallow, fireImmediately: true }
)
