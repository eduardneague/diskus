import Image from 'next/image'
import AccountProfile from '../../../components/forms/AccountProfile'
import {currentUser} from '@clerk/nextjs'

async function Page() {
    const user = await currentUser()

    const userInfo = {} // get from db.

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user.username,
        name: userInfo?.name || user.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user.imageUrl
    }

    return (
        <main className = "flex mx-auto flex-col w-[90%] sm:w-[70%] lg:w-[50%] xl:w-[40%] gap-3 bg-white justify-center p-5 rounded-xl shadow">
            <p className = "sm:text-[30px] text-[20px] mb-5 text-black font-bold flex gap-2">
                <Image
                    src = "/logo.svg"
                    alt = "Diskus Logo"
                    height = {30}
                    width = {30}
                    draggable = {false}
                    className = "select-none"
                />

                Complete your profile
            </p>
            <section className = "">
                <AccountProfile 
                    user = {userData} 
                    btnTitle = "Continue"
                />
            </section>
        </main>
    )
}

export default Page