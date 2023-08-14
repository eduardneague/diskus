"use client"

import Link from 'next/link'
import {sidebarLinks} from '../../constants/index'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import { SignedIn, SignOutButton } from "@clerk/nextjs"

function LeftSideBar() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <section className = "custom-scrollbar leftsidebar w-[8rem] lg:w-[30%] xl:w-[35%] 2xl:w-[25%]">
            <div className = "flex w-full flex-1 flex-col justify-between px-6">
                <div className = "flex flex-col flex-1 gap-4">
                {
                    sidebarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
                        
                        return (
                            <Link 
                                href = {link.route} 
                                key = {link.label}
                                className = {`relative flex items-center justify-center lg:justify-start lg:gap-4 gap-0 p-4 rounded-lg  ${isActive && 'bg-diskus-pink'} `}
                            >
                                <Image
                                    src = {link.imgURL}
                                    alt = {link.label}
                                    width = {24}
                                    height = {24}
                                    draggable = {false}
                                    className = "select-none"
                                />
                                <p className = "text-black max-lg:hidden">
                                    {link.label}
                                </p>
                            </Link>
                        )
                    })
                }
                </div>
               
                <div className = "pl-3">
                    <SignedIn>
                        <SignOutButton signOutCallback = {() => (router.push('/sign-in'))}>
                            <div className = "flex cursor-pointer">
                                <Image
                                    src = "/logout.svg"
                                    alt = "logout"
                                    width = {24}
                                    height = {24}
                                    draggable = {false}
                                    className = "select-none"
                                />
                                <p className = "text-black max-lg:hidden pl-4">
                                    Log out
                                </p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </div>

        </section>
    )
}

export default LeftSideBar