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
          getStorage: () => ({
            // Returning a promise from getItem is necessary to avoid issues with hydration
            // getItem: async (name: string) => localStorage.getItem(name),
            getItem: async (name: string) => {
              let val = localStorage.getItem(name)
              return new Promise(async (resolve) => {
                // TODO - this is temporary solution only. Write a better solution
                await setTimeout(async () => {
                  resolve(val)
                }, 2000)
              })
            },
            setItem: async (name: string, value: string) => localStorage.setItem(name, value),
            removeItem: async (name: string) => localStorage.removeItem(name),
          }),
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
