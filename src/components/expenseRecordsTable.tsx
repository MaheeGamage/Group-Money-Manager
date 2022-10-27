import { type } from "os";
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ITransactionRecord>();
    const members = useStore(state => state.members)

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
                    <td>{record.memberId}</td>
                    <td>{record.description}</td>
                    <td>{record.amount}</td>
                </tr>
            );
        });
    }

    const onTransactionInputSubmit: SubmitHandler<ITransactionRecord> = data => {
        console.log(data);
        handleAddItem({ ...data, id: idKey++ });
    }

    return (
        <>
            <Modal
                showModal={showAddNewRecordModal}
                onModalEvent={handleModalEvents}
            >
                <h3 className="font-bold text-lg">Enter Transaction Info</h3>
                <form className="form-control w-full mt-3" onSubmit={handleSubmit(onTransactionInputSubmit)}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <select className="select select-bordered w-full" {...register("memberId", { required: true })}>
                        <option value="" disabled selected>Select a person or create one</option>
                        {members.map(member => {
                            return (
                                <option key={member.id} value={member.name}>{member.name}</option>
                            );
                        })}

                    </select>
                    {/* <input type="text" placeholder="Type person name" className="input input-bordered w-full"
                        {...register("person", { required: true })} /> */}

                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Type description" className="input input-bordered w-full"
                        {...register("description", { required: true })} />

                    {/* Transaction type */}
                    {/* TODO - enable this in next release */}
                    {/* <label className="label">
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
                    </div> */}

                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input type="number" placeholder="Enter amount" className="input input-bordered w-full"
                        {...register("amount", { required: true, valueAsNumber: true })} />

                    <div className="modal-action">
                        <button className="btn btn-outline btn-secondary mx-1 grow" type="submit">Add</button>
                    </div>
                </form>
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