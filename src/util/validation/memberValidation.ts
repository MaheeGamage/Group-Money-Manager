import { IMember } from "../../models/Member.model";

export function validateUniqueMember(members: Array<IMember>, newMember: IMember) {
    return members.find(member =>
        (member.id === newMember.id) || (member.name === newMember.name)) === undefined
}