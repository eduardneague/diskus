import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions'
import {currentUser} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import {redirect} from 'next/navigation'

const Page = async () => {
    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')

    // getActivity
    const activity = await getActivity(userInfo._id)

    return (
        <section>
            <h1 className = "head-text mb-5 text-white mt-5 md:mt-0"> Activity </h1>
            <section className = "mt-5 flex flex-col gap-5">
                {activity.length > 0 ? (
                    <>
                    {activity.map((activity) => {
                        return (
                            <Link key = {activity._id} href = {`/thread/${activity.parentId}`}>
                                <article className = "activity-card bg-[#272727]">
                                    <Image
                                        src = {activity.author.image}
                                        alt = "Profile Picture"
                                        width = {30}
                                        height = {30}
                                        draggable = {false}
                                        unoptimized = {true}
                                        className = "object-cover select-none rounded-full w-[30px] h-[30px]"
                                    />
                                    <p className = "!text-small-regular text-white">
                                        <span className = "font-bold">
                                            {`${activity.author.name}`}
                                        </span>{" "}
                                        replied to your diskussion.
                                    </p>
                                </article>
                            </Link>
                        )
                    })}
                    </>
                ): (
                    <p className = "!text-base-regular text-black">No activity yet</p>
                )}
            </section>
        </section>
    )
}

export default Page