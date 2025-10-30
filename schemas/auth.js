import z from "zod"

const userSchema = z.object({
    username: z.string({
        invalid_type_error: 'must be a string',
        required_error: 'is required'
    })
    .min(6, 'must be at least 6 characters long')
    .regex(/^[^\s]+$/, 'must not contain spaces')
    .transform(val => val.toLowerCase()),
    password: z.string({
        invalid_type_error: 'must be a tring',
        required_error: 'is required'
    })
    .min(8, 'must be at least 8 characters long')
    .regex(/[a-z]/, 'must contain at least one lowercase character')
    .regex(/[A-Z]/, 'must contain at least one uppercase character')
    .regex(/[A-Z]/, 'must contain at least one number')
    .regex(/^[^\s]+$/, 'must not contain spaces')
})

export function validateUser(input) {
    return userSchema.safeParse(input)
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input)
}