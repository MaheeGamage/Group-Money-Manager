import { FC, useState } from "react"
import { ITransactionRecord } from "../models/ITransactionRecord";

let idKey = 0;

export const ExpenseRecordsTable: FC = props => {
    const sampleList: ITransactionRecord[] = [
        { id: 1, type: "Expence", amount: 100, description: "Groceries", person: "John" },
    ]

    const [records, updateRecords] = useState<Array<ITransactionRecord>>([]);

    const handleRemoveRecord = (id: number) => {
        updateRecords(records.filter(record => record.id !== id));
    };

    const handleAddItem = (record: ITransactionRecord) => {
        updateRecords(existingRecords => [...existingRecords, record]);
    };

    const renderTransactionRecords = () => {
        return records.map(record => {
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