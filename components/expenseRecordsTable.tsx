import { FC, useState } from "react"
import { ITransactionRecord } from "../models/ITransactionRecord";
import { useStore } from "../store/store";
import Modal, { ModalAction } from "./Modal/Modal";

export const ExpenseRecordsTable: FC = props => {
    // Zustand Store
    const transactionRecords = useStore(state => state.transactionRecords)
    const addTransactionRecord = useStore(state => state.addTransactionRecord);
    const removeTransactionRecord = useStore(state => state.removeTransactionRecord);
    const [showAddNewRecordModal, setShowAddNewRecordModal] = useState(false);

    // Component supporting functions
    const handleRemoveRecord = (id: number) => {
        removeTransactionRecord(id);
    };

    const handleAddItem = (record: ITransactionRecord) => {
        addTransactionRecord(record);
    };

    const handleModalEvents = (action: ModalAction) => {
        switch (action) {
            case ModalAction.CLOSE:
                setShowAddNewRecordModal(false);
        }
    }

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
            <Modal
                showModal={showAddNewRecordModal}
                onModalEvent={handleModalEvents}
            >
                <h3 className="font-bold text-lg">Enter Transaction Info</h3>
                <div className="form-control w-full max-w-xs">
                    {/* <label className="label">
                        <span className="label-text">What is your name?</span>
                        <span className="label-text-alt">Alt label</span>
                    </label> */}
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    {/* <label className="label">
                        <span className="label-text-alt">Alt label</span>
                        <span className="label-text-alt">Alt label</span>
                    </label> */}
                </div>
                <div className="modal-action">
                    <label className="btn">Yay!</label>
                </div>
            </Modal>

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
                    {/* <tr>
                        <td className="p-0"><input type="text" placeholder="Name" className="input input-xs w-full max-w-xs bg-neutral" /></td>
                        <td className="p-0"><input type="text" placeholder="Description" className="input input-xs w-full max-w-xs bg-neutral" /></td>
                        <td className="p-0"><input type="text" placeholder="Amount" className="input input-xs w-full max-w-xs bg-neutral" /></td>
                    </tr> */}
                    <tr>
                        <td colSpan={3}>
                            <button
                                className="btn btn-block btn-outline h-8 min-h-full"
                                // onClick={() => handleAddItem({ id: ++idKey, type: "Expence", amount: 100, description: "Groceries", person: "John" })}
                                onClick={() => setShowAddNewRecordModal(true)}
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