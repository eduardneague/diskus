import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs"

function Topbar() {
    return (
        <nav className = "w-full md:w-[90%] flex bg-[#272727] items-center justify-between md:rounded-xl shadow p-2 md:mb-5 px-6 ">
            <Link href = "/" className = "flex items-center gap-2">
                <Image
                    src = "/logo.svg"
                    alt = "Diskus Logo"
                    width = {28}
                    height = {28}
                    draggable = {false}
                    className = "select-none"
                />
                <p className = "text-heading3-bold text-white ">
                    Diskus
                </p>
            </Link>

            <div className = "flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className = "flex cursor-pointer">
                                <Image
                                    src = "/logout.svg"
                                    alt = "logout"
                                    width = {24}
                                    height = {24}
                                    draggable = {false}
                                    className = "select-none"
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance = {{
                        elements: {
                            organizationSwitcherTrigger: "py-2 pl-3 pr-0 text-white bg-[#272727]"
                        }
                    }}
                />
            </div>
            
        </nav>
    )
}

export default Topbar