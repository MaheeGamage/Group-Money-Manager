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
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">User Info</h2>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" {...bindUserName}
                        />
                    </div>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary btn-block" onClick={handleUserInfoSubmit}>Enter</button>
                    </div>
                </div>
            </div>
        </>
    )
}