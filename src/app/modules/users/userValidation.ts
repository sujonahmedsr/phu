import {z} from 'zod'

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string'
    }).max(8, {message: 'Password can not be more than 8 character'}).optional()
})

export const userValidation = {
    userValidationSchema
}