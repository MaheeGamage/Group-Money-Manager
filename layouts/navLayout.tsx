import { ComponentType } from "react"

type NavLayoutProps = {
    children: React.ReactNode,
  };

const NavLayout = ({children}: NavLayoutProps) => {
    return (
        <>
            <div className="navbar bg-base-100">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <main>{children}</main>
        </>
    )
}

export default NavLayout;