import create, { StateCreator } from 'zustand'
import { IMember } from '../models/Member.model'
import { validateUniqueMember } from '../util/validation/memberValidation'
import { MemberSlice, TransactionRecordSlice } from './store.model'

export const createMemberSlice: StateCreator<
    MemberSlice & TransactionRecordSlice,
    [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
    [],
    MemberSlice
> = (set, get) => ({
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
})