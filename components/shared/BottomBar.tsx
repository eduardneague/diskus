"use client"

import Link from 'next/link'
import {sidebarLinks} from '../../constants/index'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

function BottomBar() {

    const pathname = usePathname()

    return (
        <>
            <section className = "bottombar shadow-2xl shadow-black bg-[#272727]">
                <div className = "bottombar_container text-white">
                {
                    sidebarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
                        
                        return (
                            <Link 
                                href = {link.route} 
                                key = {link.label}
                                className = {`bottombar_link ${isActive && 'bg-diskus-pink text-white'} `}
                            >
                                <Image
                                    src = {link.imgURL}
                                    alt = {link.label}
                                    width = {24}
                                    height = {24}
                                    draggable = {false}
                                    className = "select-none"
                                />
                                <p className = "text-white text-sublte-medium max-sm:hidden">
                                    {link.label.split(/\s+./)[0]}
                                </p>
                            </Link>
                        )
                    })
                }
                </div>
            </section>
        </>
    )
}

export default BottomBar