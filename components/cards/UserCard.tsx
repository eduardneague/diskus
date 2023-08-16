"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({id, name, username, imgUrl, personType}: Props) => {
    const router = useRouter()

    return (
        <>
            <Link href = {`/profile/${id}`}>
                <article className = "user-card bg-white p-3 rounded-xl shadow">
                    <div className = "user-card_avatar">
                            <Image
                                src = {imgUrl}
                                alt = "logo"
                                width = {48}
                                height = {48}
                                className = "rounded-full select-none object-cover w-[48px] h-[48px]"
                                draggable = {false}
                                unoptimized = {true}
                                />

                        <div className = "flex-1 text-ellipsis">
                            <h4 className = "text-base-semibold text-black"> {name} </h4>
                            <p className = "text-gray-500 text-small-medium"> @{username} </p>
                        </div>
                    </div>

                    <Button 
                        className = "bg-diskus-pink text-black hover:text-white"
                        onClick = {() => router.push(`/profile/${id}`)}
                        >
                        View
                    </Button>

                </article>
            </Link>
        </>
    )
}

export default UserCard