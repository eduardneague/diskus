import PostThread from '@/components/forms/PostThread'
import { fetchUser } from '@/lib/actions/user.actions'
import {currentUser} from '@clerk/nextjs'
import {redirect} from 'next/navigation'

async function Page() {

    const user = await currentUser()
    if(!user) return null
    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')

    return (
        <>
            <h1 className = "head-text text-white mb-5 mt-5 md:mt-0">Create Diskussion</h1>
            <PostThread userId = {userInfo._id}/>
        </>
    )
}

export default Page