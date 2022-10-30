import { ComponentType } from "react"

type NavLayoutProps = {
	children: React.ReactNode,
};

const NavWithSidebarLayout = ({ children }: NavLayoutProps) => {
	return (
		<>
			<div className="drawer drawer-mobile">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Navbar */}
					<div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content">
						<div className="navbar bg-base-100">
							<div className="flex-none lg:hidden">
								<label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
								</label>
							</div>
							<div className="flex-1 lg:hidden">
								<a href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
									<div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
										<span className="normal-case">Group</span> <span className="text-base-content uppercase">Budget</span>
									</div>
								</a>
							</div>
							{/* <div className="flex-none">
								<button className="btn btn-square btn-ghost">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
								</button>
							</div> */}
						</div>
					</div>
					{/* Content */}
					<main>{children}</main>
					{/* Content End */}
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
					<aside className="bg-base-200 w-80">
						<div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
							<a aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
								<div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-2xl">
									<span className="normal-case">Group</span> <span className="text-base-content uppercase">Budget</span>
								</div>
							</a>
						</div>

						<ul className="menu p-4 overflow-y-auto bg-base-100 text-base-content">
							<li><a>Budget Calculator</a></li>
						</ul>
					</aside>
				</div>
			</div>

		</>
	)
}

export default NavWithSidebarLayout;