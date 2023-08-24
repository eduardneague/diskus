import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThreadById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation"

const Page = async ({ params }: {params: {id: string}}) => {
    if(!params.id) return null
    
    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
//dd
    const thread = await fetchThreadById(params.id)

    return (
        <section>
            <div className = "mt-5">
                <ThreadCard
                    key = {thread._id}
                    id = {thread._id}
                    currentUserId = {user?.id || ""}
                    parentId = {thread.parentId}
                    content = {thread.text}
                    author = {thread.author}
                    community = {thread.community}
                    createdAt = {thread.createdAt}
                    comments = {thread.children}
                />
                <h1 className = "font-bold text-[30px] text-white mt-6">Comments</h1>
            </div>

            <div className = "mt-7">
                <Comment
                    threadId = {thread.id}
                    currentUserImg = {userInfo.image}
                    currentUserId = {JSON.stringify(userInfo._id)}
                />
            </div>
            <div className = "mt-10 mb-[6rem] md:mb-0">
                {thread.children.map((childItem: any) => {
                    return (
                        <div className = "mb-5">
                            <ThreadCard
                                key = {childItem._id}
                                id = {childItem._id}
                                currentUserId = {user?.id || ""}
                                parentId = {childItem.parentId}
                                content = {childItem.text}
                                author = {childItem.author}
                                community = {childItem.community}
                                createdAt = {childItem.createdAt}
                                comments = {childItem.children}
                                isComment
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
 
}

export default Page