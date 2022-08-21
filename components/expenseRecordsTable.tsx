import { type } from "os";
import { FC, useState } from "react"
import { ITransactionRecord, TransactionType } from "../models/TransactionRecord.model";
import { useStore } from "../store/store";
import Modal, { ModalAction } from "./Modal/Modal";

let idKey = 0;

export const ExpenseRecordsTable: FC = props => {
    // Zustand Store
    const transactionRecords = useStore(state => state.transactionRecords)
    const addTransactionRecord = useStore(state => state.addTransactionRecord);
    const removeTransactionRecord = useStore(state => state.removeTransactionRecord);
    const [showAddNewRecordModal, setShowAddNewRecordModal] = useState(false);
    const [modalForm, setModalForm] = useState({
        [formInputType.NAME]: "",
        [formInputType.DESCRIPTION]: "",
        [formInputType.AMOUNT]: "",
        [formInputType.TYPE]: ""
    });

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

    const handleNewRecordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setModalForm({
            ...modalForm,
            [name]: value
        });
    }

    const renderTransactionRecords = () => {
        return transactionRecords.map(record => {
            return (
                <tr key={record.id}>
                    <td>{record.person}</td>
                    <td>{record.description}</td>
                    <td>{record.type}</td>
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
                <div className="form-control w-full mt-3">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input name={formInputType.NAME} type="text" placeholder="Type person name" className="input input-bordered w-full" onChange={handleNewRecordInputChange} />

                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input name={formInputType.DESCRIPTION} type="text" placeholder="Type description" className="input input-bordered w-full" onChange={handleNewRecordInputChange} />

                    <label className="label">
                        <span className="label-text">Expense type</span>
                    </label>
                    <div className="flex">
                        <div className="inline-flex">
                            <input type="radio" name={formInputType.TYPE} className="radio checked:bg-red-500"
                                value={TransactionType.EXPENSE}
                                onChange={handleNewRecordInputChange}
                                checked={TransactionType.EXPENSE === modalForm[formInputType.TYPE]}
                            />
                            <span className="label-text ml-2">Expense</span>
                        </div>
                        <div className="inline-flex ml-10">
                            <input type="radio" name={formInputType.TYPE} className="radio checked:bg-red-500"
                                value={TransactionType.TRANSFER}
                                onChange={handleNewRecordInputChange}
                                checked={TransactionType.TRANSFER === modalForm[formInputType.TYPE]}
                            />
                            <span className="label-text ml-2">Transfer</span>
                        </div>
                    </div>

                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input name={formInputType.AMOUNT} type="text" placeholder="Enter amount" className="input input-bordered w-full" onChange={handleNewRecordInputChange} />
                </div>
                <div className="modal-action">
                    <button className="btn btn-outline btn-secondary mx-1 grow"
                        onClick={() => handleAddItem({
                            id: ++idKey,
                            type: modalForm[formInputType.TYPE] as TransactionType,
                            amount: parseInt(modalForm[formInputType.AMOUNT]),
                            description: modalForm[formInputType.DESCRIPTION],
                            person: modalForm[formInputType.NAME]
                        })}>
                        Add
                    </button>
                </div>
            </Modal>

            <table className="table w-full">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
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
                        <td colSpan={4}>
                            <button
                                className="btn btn-block btn-outline h-8 min-h-full"
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

enum formInputType {
    NAME = "EXPENSE-RECORD-TABLE-MODAL-NAME",
    DESCRIPTION = "EXPENSE-RECORD-TABLE-MODAL-DESCRIPTION",
    TYPE = "EXPENSE-RECORD-TABLE-MODAL-TYPE",
    AMOUNT = "EXPENSE-RECORD-TABLE-MODAL-AMOUNT"
}