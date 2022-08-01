import { FC, useState } from "react"
import { ITransactionRecord } from "../models/ITransactionRecord";
import { useStore } from "../store/store";

let idKey = 0;  

export const ExpenseRecordsTable: FC = props => {
    const sampleList: ITransactionRecord[] = [
        { id: 1, type: "Expence", amount: 100, description: "Groceries", person: "John" },
    ]

    // Zustand Store
    const transactionRecords = useStore(state => state.transactionRecords)
    const addTransactionRecord = useStore(state => state.addTransactionRecord);
    const removeTransactionRecord = useStore(state => state.removeTransactionRecord);

    // Component supporting functions
    const handleRemoveRecord = (id: number) => {
        removeTransactionRecord(id);
    };

    const handleAddItem = (record: ITransactionRecord) => {
        addTransactionRecord(record);
    };

    const renderTransactionRecords = () => {
        return transactionRecords.map(record => {
            return (
                <tr key={record.id}>
                    <td>{record.person}</td>
                    <td>{record.description}</td>
                    <td>{record.amount}</td>
                </tr>
            );
        });
    }

    return (
        <>
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTransactionRecords()}
                    <tr>
                        <td colSpan={3}>
                            <button
                                className="btn btn-block btn-outline h-8 min-h-full"
                                onClick={() => handleAddItem({ id: ++idKey, type: "Expence", amount: 100, description: "Groceries", person: "John" })}
                            >
                                Add Entry
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}