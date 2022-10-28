import { type } from "os";
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { ITransactionRecord, TransactionType } from "../models/TransactionRecord.model";
import { useStore } from "../store/store";
import { nameof } from "../util/other";
import Modal, { ModalAction } from "./Modal/Modal";

let idKey = 0;

export const ExpenseRecordsTable: FC = props => {
    // Zustand Store
    const transactionRecords = useStore(state => state.transactionRecords)
    const addTransactionRecord = useStore(state => state.addTransactionRecord);
    const removeTransactionRecord = useStore(state => state.removeTransactionRecord);
    const members = useStore(state => state.members)

    const [showAddNewRecordModal, setShowAddNewRecordModal] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ITransactionRecord>();
    const watchTransactionType = watch(nameof<ITransactionRecord>("type")); 

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
                    <td>
                        <button className="btn btn-xs" onClick={() => handleRemoveRecord(record.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="#FFFFFF" d="M6.5 17q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v10q0 .625-.438 1.062Q14.125 17 13.5 17Zm7-11.5h-7v10h7ZM8 14h1.5V7H8Zm2.5 0H12V7h-1.5Zm-4-8.5v10Z" /></svg>
                        </button>
                    </td>
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
                    <div className="flex mb-1">
                        <div className="flex">
                            <input type="radio" {...register(nameof<ITransactionRecord>("type"))} value={TransactionType.UNPAID} className="radio radio-primary" id="radio_unpaid" />
                            <label htmlFor="radio_unpaid" className="mx-1">Unpaid</label>
                        </div>
                        <div className="flex">
                            <input type="radio" {...register(nameof<ITransactionRecord>("type"))} value={TransactionType.PAID} className="radio radio-primary" id="radio_paid" />
                            <label htmlFor="radio_paid" className="mx-1">Paid</label>
                        </div>
                        <div className="flex">
                            <input type="radio" {...register(nameof<ITransactionRecord>("type"))} value={TransactionType.SPECIAL_DEDUCTION} className="radio radio-primary" id="radio_special" />
                            <label htmlFor="radio_special" className="mx-1">Special Deduction</label>
                        </div>
                    </div>

                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <select className="select select-bordered w-full" {...register(nameof<ITransactionRecord>("memberId"), { required: true })} disabled={watchTransactionType === TransactionType.UNPAID}>
                        <option value="" disabled>Select a person or create one</option>
                        {members.map(member => <option key={member.id} value={member.name}>{member.name}</option>)}
                    </select>

                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Type description" className="input input-bordered w-full"
                        {...register(nameof<ITransactionRecord>("description"), { required: true })} />

                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input type="number" placeholder="Enter amount" className="input input-bordered w-full"
                        {...register(nameof<ITransactionRecord>("amount"), { required: true, valueAsNumber: true })} />

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
                        <th>Options</th>
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