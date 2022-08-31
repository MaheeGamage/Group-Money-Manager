import { FC, useState } from "react";
import { useHandleInput } from "../../hooks/useHandleInput";
import { MAIN_USER_NAME_LOCAL_STORAGE_KEY } from "../../constants/constants"
import Router from "next/router";
import Modal, { ModalAction } from "../Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITransactionRecord } from "../../models/TransactionRecord.model";
import { IMember } from "../../models/Member.model";
import { generateMemberId } from "../../util/stringUtil";
import { useStore } from "../../store/store";

export const UserInfoCard: FC = props => {

    const totalBudget = useStore(state => state.totalBudget)
    const { value: valueUserName, bind: bindUserName } = useHandleInput('');
    const [showAddNewMemberModal, setShowAddNewMemberModal] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IMember>();

    const members = useStore(state => state.members)
    const addMember = useStore(state => state.addMember);
    const removeMember = useStore(state => state.removeMember);

    const handleUserInfoSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (valueUserName) {
            localStorage.setItem(MAIN_USER_NAME_LOCAL_STORAGE_KEY, valueUserName);
            Router.push("/");
        }
        else
            alert("Please enter a valid name")
    }

    const handleModalEvents = (action: ModalAction) => {
        switch (action) {
            case ModalAction.CLOSE:
                setShowAddNewMemberModal(false);
        }
    }

    const onNewUserSubmit: SubmitHandler<IMember> = data => {
        addMember({ ...data, id: generateMemberId(data.name) })
            .catch(error => {
                alert("User Already Exists");
            })
    }

    return (
        <>
            <Modal
                showModal={showAddNewMemberModal}
                onModalEvent={handleModalEvents}
            >
                <form className="form-control w-full mt-3" onSubmit={handleSubmit(onNewUserSubmit)}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Type Name" className="input input-bordered w-full"
                        {...register("name", { required: true })} />

                    <div className="modal-action">
                        <button className="btn btn-outline btn-secondary mx-1 grow" type="submit">Add</button>
                    </div>
                </form>
            </Modal>
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="flex">

                        <div className="flex-1">
                            <h1 className="card-title text-2xl">Mahee's Budget</h1>
                            <div className="flex ">
                                <p className="flex-none">{members.length} Members</p>
                                <button
                                    className="btn btn-square btn-xs ml-1"
                                    onClick={() => setShowAddNewMemberModal(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="shrink">
                            <div className="flex h-full items-end prose">
                                <p className='mb-0 whitespace-pre'>Total </p>
                                <h1>{totalBudget}</h1>
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex mt-8 justify-around'>
                        <button className="btn btn-outline btn-info mx-1 grow ">Info</button>
                        <button className="btn btn-outline btn-success mx-1 grow ">Success</button>
                        <button className="btn btn-outline btn-warning mx-1 grow ">Warning</button>
                        <button className="btn btn-error mx-1 grow ">Error</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}