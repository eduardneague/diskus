import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchUser } from '@/lib/actions/user.actions'
import {currentUser} from '@clerk/nextjs'
import {redirect} from 'next/navigation'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { profileTabs } from '@/constants'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'

const page = async ({params} : {params: {id: string}}) => {
    const user = await currentUser()
    if(!user) return null
    const userInfo = await fetchUser(params.id)

    if(!userInfo?.onboarded) redirect('/onboarding')

    return (
        <section className = "mt-5 md:mt-0 mb-[10rem]">
            <ProfileHeader
                accountId = {userInfo.id}
                authUserId = {user.id}
                name = {userInfo.name}
                username = {userInfo.username}
                imgUrl = {userInfo.image}
                bio = {userInfo.bio}
            />
            <div className = "mt-9">
                <Tabs defaultValue = "threads" className = "w-full">
                    <TabsList className = "w-full flex gap-0 bg-[#101010]">
                        {profileTabs.map((tab) => {
                            return (
                                <TabsTrigger key = {tab.label} value = {tab.value} className = "tab" >
                                    <Image
                                        src= {tab.icon}
                                        alt = {tab.label}
                                        width = {24}
                                        height = {24}
                                        className = "object-contain select-none"
                                        draggable = {false}
                                    />
                                <p className = "max-sm:hidden">{tab.label}</p>
                                {tab.label === 'Threads' &&
                                    <p className = "rounded-sm bg-white px-2 py-1 !text-tiny-medium text-white">
                                        {userInfo?.threads?.length}
                                    </p>
                                }
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                    {profileTabs.map((tab) => {
                        return (
                            <TabsContent 
                                key = {`content-${tab.label}`} 
                                value = {tab.value}
                                className = "w-full text-black"
                            >
                                <ThreadsTab
                                    currentUserId = {user.id}
                                    accountId = {userInfo.id}
                                    accountType = "User"
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </section>
    )
}

export default page