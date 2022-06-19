import { FC, useState } from "react";
import { useHandleInput } from "../../hooks/useHandleInput";

export const UserInfoCard: FC = props => {

    const { value:valueUserName, bind:bindUserName } = useHandleInput('');

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
                        <button className="btn btn-primary btn-block">Enter</button>
                    </div>
                </div>
            </div>
        </>
    )
}