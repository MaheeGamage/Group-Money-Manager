import { FC, useState } from "react"
import { ITransactionRecord } from "../models/ITransactionRecord";

export const ExpenseRecordsTable: FC = props => {
    const sampleList: ITransactionRecord[] = [
        {id: 1, type: "Expence", amount: 100, description: "Groceries", person: "John"},
    ]

    const [records, updateRecords] = useState<Array<ITransactionRecord>>([]);

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
                    <tr>
                        <td>Jhon Doe</td>
                        <td>Rent</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>Jhon Doe</td>
                        <td>Rent</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>Jhon Doe</td>
                        <td>Rent</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        {/* center div */}
                        <td colSpan={3}>
                            <button className="btn btn-block btn-outline h-8 min-h-full">Add Entry</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}