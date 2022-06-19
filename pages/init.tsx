import { NextPage } from "next";
import { UserInfoCard } from "../components/cards/userInfoCard";

const Init: NextPage = () => {
    return (
        <div className="grid h-screen place-items-center">
            <UserInfoCard/>
        </div>

    )
}

export default Init;