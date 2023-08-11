import * as z from 'zod'

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(5, {message: 'Minimum of 5 characters.'}).max(200, {message: 'Maximum of 200 chracaters.'}),
    accountId: z.string()
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(5, {message: 'Minimum of 5 characters.'}).max(200, {message: 'Maximum of 200 chracaters.'}),
})


