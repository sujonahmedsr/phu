import {z} from 'zod'
import { UserStatus } from './userConstant';

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string'
    }).max(8, {message: 'Password can not be more than 8 character'}).optional()
})

const changeStatusValidationSchema = z.object({
    body: z.object({
      status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
  });

export const userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
}