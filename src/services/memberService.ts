import { useStore } from "../store/store";

export const validateBeforeMemberDeletion = (memberId: String) => {
    const transactionRecords = useStore.getState().transactionRecords;

    const isUserPresentInTransactionRecords = transactionRecords.some(
        (record) => record.memberId === memberId
    );
    return isUserPresentInTransactionRecords;
}