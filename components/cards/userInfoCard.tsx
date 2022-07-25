import { FC } from "react";
import { useHandleInput } from "../../hooks/useHandleInput";
import { MAIN_USER_NAME_LOCAL_STORAGE_KEY } from "../../constants/constants"
import Router from "next/router";

export const UserInfoCard: FC = props => {

    const { value: valueUserName, bind: bindUserName } = useHandleInput('');

    const handleUserInfoSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (valueUserName) {
            localStorage.setItem(MAIN_USER_NAME_LOCAL_STORAGE_KEY, valueUserName);
            Router.push("/");
        }
        else
            alert("Please enter a valid name")
    }

    return (
        <>
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="flex">

                        <div className="flex-1">
                            <h1 className="card-title text-2xl">Mahee's Budget</h1>
                            <p>4 Members</p>
                        </div>

                        <div className="shrink">
                            <div className="flex h-full items-end prose">
                                <p className='mb-0 whitespace-pre'>Total </p>
                                <h1>1234</h1>
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