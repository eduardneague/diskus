import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, {message: 'Minimum of 3 characters.'}).max(30),
    username: z.string().min(3, {message: 'Minimum of 3 characters.'}).max(30),
    bio: z.string().min(20, {message: 'Minimum of 20 characters.'}).max(200, {message: 'Maximum of 200 characters.'})
})