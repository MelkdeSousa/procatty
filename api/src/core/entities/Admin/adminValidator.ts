import { z as zod } from 'zod'

import { IValidator } from "@core/interfaces/helpers/validator";
import { Notification } from "@core/logic/notification";
import { PASSWORD_STRONG, USERNAME } from '@core/constants/regex';
import { IAdminProps } from "./admin";

export class AdminValidator implements IValidator<IAdminProps> {
  validate(props: IAdminProps): [boolean, Notification[]] {
    const adminSchemaValidation = zod.object({
      _id: zod
        .string()
        .uuid()
        .optional(),
      name: zod
        .string()
        .nonempty({ message: 'name is required' })
        .min(2, { message: 'name must have at least 2 characters' }),
      email: zod
        .string()
        .email({ message: 'email is invalid' }),
      avatar: zod
        .string()
        .url({ message: 'url to avatar is invalid' })
        .optional(),
      username: zod
        .string()
        .min(6, { message: 'username must have at least 6 characters' })
        .regex(USERNAME, { message: 'username is invalid' }),
      password: zod
        .string()
        .min(6, { message: 'password must be at least 6 characters' })
        .max(128, { message: 'password is too long' })
        .regex(PASSWORD_STRONG, { message: 'password must have at least one uppercase, one lowercase, one number and one special character' })
    })

    const isValid = adminSchemaValidation.safeParse(props)
    let errors: Notification[] = []

    if (!isValid.success) {
      isValid.error.errors.map((error) => errors.push({ message: error.message.toLowerCase(), key: error.path.join('.').toLowerCase() }))
    }

    return [isValid.success, errors]
  }
}
