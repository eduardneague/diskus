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
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation';

import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';
// import { updateUser } from '@/lib/actions/user.actions';
import { useOrganization } from '@clerk/nextjs';

function PostThread({userId}: {userId: string}) {
    const router = useRouter()
    const pathname = usePathname()
    const { organization } = useOrganization()

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        })
        router.push("/")
    }

    return (
        <>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="flex flex-col w-full justify-start gap-5"
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className = "flex flex-col w-full">
                            <FormLabel className = "text-base-semibold text-white">
                                Content
                            </FormLabel>
                            <FormControl className = "no-focus w-full border border-dark-4 bg-[#272727] text-white">
                                <Textarea
                                    className = "w-full" 
                                    rows = {15}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button 
                        type = "submit"
                        className = "bg-diskus-pink text-black hover:text-white"
                    >
                        Post
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread