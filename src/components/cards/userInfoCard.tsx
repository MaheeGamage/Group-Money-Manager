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

    const onClickRemoveUser = (member: IMember) => {
        removeMember(member.id);
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
                    <div className="mt-2">
                        {members.map((member, index) =>
                            <div className="flex bg-base-300 p-2 mb-1 rounded-xl">
                                <p>{member.name}</p>
                                {index == 0 ? <div className="badge badge-primary badge-outline mr-2">primary</div> : null}
                                <button className="btn btn-circle btn-outline btn-xs" onClick={() => onClickRemoveUser(member)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}