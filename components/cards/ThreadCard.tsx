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
        <article className = "flex w-full flex-col rounded-xl bg-white p-7 shadow">
            <div className = "flex items-start justify-between">
                <div className = "flex w-full flex-1 flex-row gap-4">
                    <div className = "flex flex-col items-center">
                        <Link href= {`/profile/${author.id}`} className = "relative h-11 w-11">
                            <Image
                                src = {author.image}
                                alt = "Profile Image"
                                fill
                                className = "cursor-pointer rounded-full select-none"
                                draggable = {false}
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
            </div>
        </article>
    )
}

export default ThreadCard