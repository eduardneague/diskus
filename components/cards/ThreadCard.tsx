import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean
}

const ThreadCard = ({
    id, 
    currentUserId, 
    parentId,
    content, 
    author, 
    community, 
    createdAt, 
    comments,
    isComment
}: Props) => {
    return (
        <article className = {` ${isComment ? 'px-0 xs:px-7' : 'bg-white p-7 shadow'}  flex w-full flex-col rounded-xl`}>
            <div className = "flex items-start justify-between">
                <div className = "flex w-full flex-1 flex-row gap-4">
                    <div className = "flex flex-col items-center">
                        <Link href= {`/profile/${author.id}`} className = "relative h-11 w-11">
                            <Image
                                src = {author.image}
                                alt = "Profile Image"
                                height = {48}
                                width = {48}
                                className = "cursor-pointer rounded-full object-cover select-none w-[48px] h-[48px]"
                                draggable = {false}
                                unoptimized = {true}
                            />
                        </Link>
                        <div className = "thread-card_bar"/>
                    </div>
                    <div className = "flex w-full flex-col">
                        <Link href= {`/profile/${author.id}`} className = "w-fit">
                            <h4 className = "cursor-pointer text-base-semibold">{author.name}</h4>
                        </Link>
                        <p className = "mt-2 text-small-regular text-black">{content}</p>
                        <div className = "flex flex-col gap-3">
                            <div className = "mt-3 flex gap-3.5">
                                <Image
                                    src = "/heart-gray.svg"
                                    alt = "heart"
                                    width = {24}
                                    height = {24}
                                    className = "cursor-pointer object-contain select-none"
                                    draggable = {false}
                                />
                                <Link href = {`/thread/${id}`}>
                                    <Image
                                        src = "/reply.svg"
                                        alt = "reply"
                                        width = {24}
                                        height = {24}
                                        className = "cursor-pointer object-contain select-none"
                                        draggable = {false}
                                    />
                                </Link>
                                <Image
                                    src = "/repost.svg"
                                    alt = "repost"
                                    width = {24}
                                    height = {24}
                                    className = "cursor-pointer object-contain select-none"
                                    draggable = {false}
                                />
                                <Image
                                    src = "/share.svg"
                                    alt = "share"
                                    width = {24}
                                    height = {24}
                                    className = "cursor-pointer object-contain select-none"
                                    draggable = {false}
                                />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href = {`/thread/${id}`}>
                                    <p className = "mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}

                        </div>
                    </div>
                </div>

                {/* delete thread */}

            </div>

                    {!isComment && community && (
                        <Link href = {`/communities/${community.id}`} className = "mt-5 flex items-center">
                            <p className = "text-subtle-medium text-gray-500">
                                {formatDateString(createdAt)}
                                {" "} - {community.name} Community
                            </p>
                            <Image
                                src = {community.image}
                                alt = {community.name}
                                width = {14}
                                height = {14}
                                className = "cursor-pointer ml-1 rounded-full object-cover select-none h-[14px] w-[14px]"
                                draggable = {false}
                                unoptimized = {true}
                            />
                        </Link>
                    )} 
        </article>
    )
}

export default ThreadCard