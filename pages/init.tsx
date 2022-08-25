import { NextPage } from "next";
import { UserInfoCard } from "../src/components/cards/userInfoCard";

const Init: NextPage = () => {
    return (
        <div className="grid h-screen place-items-center">
            <UserInfoCard/>
        </div>

    )
}

export default Init;