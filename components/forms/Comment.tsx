"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { CommentValidation } from '@/lib/validations/thread';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';
  
interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {

    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
        form.reset()
    }
    return (
        <>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="comment-form"
            >
                <FormField
                    control={form.control}
                    name = "thread"
                    render={({ field }) => (
                        <FormItem className = "flex items-center w-full">
                        <FormLabel>
                            <Image
                                src = {currentUserImg}
                                alt = "Profile Picture"
                                height = {48}
                                width = {48}
                                className = "rounded-full select-none object-cover w-[48px] h-[48px]"
                                draggable = {false}
                                unoptimized = {true}
                            />
                        </FormLabel>
                        <FormControl className = "border-none bg-transparent">
                            <Input
                                type = "text"
                                placeholder = "Comment..."
                                className = "no-focus text-black outline-none" 
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <Button 
                    type = "submit"
                    className = "bg-diskus-pink text-black hover:text-white w-full reply-button"
                >
                    Reply
                </Button>
            </form>
        </Form>
    </>
    )
}

export default Comment