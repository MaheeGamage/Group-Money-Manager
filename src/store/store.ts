import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import shallow from "zustand/shallow";
import { createMemberSlice } from "./member.slice";
import { GlobalState, MemberSlice, TransactionRecordSlice } from "./store.model";
import { createTransactionSlice } from "./transaction.slice";

export const useStore = create<GlobalState>()(subscribeWithSelector((...a) => ({
    ...createMemberSlice(...a),
    ...createTransactionSlice(...a)
})))

useStore.subscribe(
    state => [state.transactionRecords], //deps, only compute when a & b change
    ([transactionRecords]) => {
      useStore.setState({ totalBudget: transactionRecords.reduce((accm, a) => accm + a.amount, 0) });
    },
    { equalityFn: shallow, fireImmediately: true }
  )
  