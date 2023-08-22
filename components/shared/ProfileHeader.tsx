import Image from "next/image";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: 'User' | 'Community';
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type
}: Props) => {
    return (
        <div className = "flex w-full flex-col justify-start">
            <div className = "flex items-center justify-between">
                <div className = "flex items-center gap-3">
                    <div className = "relative h-20 w-20 object-cover">
                        <Image
                            src = {imgUrl}
                            alt = "Profile Image"
                            fill
                            className = "rounded-full object-cover shadow-md select-none text-white"
                            unoptimized = {true}
                            draggable = {false}
                        />
                    </div>

                    <div className = "flex-1">
                        <h2 className = "text-left text-white text-heading3-bold">{name}</h2>
                        <p className = "text-base-medium text-gray-300">@{username}</p>
                    </div>
                </div>
            </div>
        {/* Todo: community */}
                <h2 className = "text-white font-bold mt-6 mb-2 text-heading4-medium">Bio</h2>
                <p className = "mt-0 max-w-lg text-base-regular text-white">{bio}</p>
                <div className = "mt-3 h-0.5 w-full bg-gray-300"/>
        </div>
    )
}

export default ProfileHeader