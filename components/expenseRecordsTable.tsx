import { FC } from "react"

export const ExpenseRecordsTable: FC = props => {
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
                            <button className="btn btn-block btn-outline">Add Entry</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}