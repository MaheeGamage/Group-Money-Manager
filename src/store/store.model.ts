import { IMember } from "../models/Member.model"
import { ITransactionRecord } from "../models/TransactionRecord.model"

export interface MemberSlice {
    members: Array<IMember>
    addMember: (member: IMember) => Promise<boolean>
    removeMember: (id: string) => void
}

export interface TransactionRecordSlice {
    transactionRecords: Array<ITransactionRecord>
    totalBudget: number
    addTransactionRecord: (record: ITransactionRecord) => void
    removeTransactionRecord: (id: number) => void
}

export type GlobalState = MemberSlice & TransactionRecordSlice;