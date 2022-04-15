import { z as zod } from 'zod'

import { IValidator } from "@core/interfaces/helpers/validator";
import { Notification } from "@core/logic/notification";
import { PHONE_NUMBER_PT_BT } from '../../constants/regex'
import { IProfessionalProps } from "./professional";

export class ProfessionalValidator implements IValidator<IProfessionalProps> {
  validate(props: IProfessionalProps): [boolean, Notification[]] {
    const professionalSchemaValidation = zod.object({
      _id: zod
        .string()
        .uuid()
        .optional(),
      name: zod
        .string()
        .nonempty({ message: 'name is required' })
        .min(2, { message: 'name must have at least 2 characters' }),
      bio: zod
        .string()
        .max(256, { message: 'bio must have at most 256 characters' })
        .optional(),
      phone: zod
        .string()
        .regex(PHONE_NUMBER_PT_BT, { message: 'phone is invalid' })
        .min(1, { message: 'phone is required' })
        .max(16, { message: 'phone must have at most 16 characters' })
        .min(8, { message: 'phone must have at least 8 characters' }),
      email: zod
        .string()
        .email({ message: 'email is invalid' }),
      avatar: zod
        .string()
        .url({ message: 'url to avatar is invalid' })
    })

    const isValid = professionalSchemaValidation.safeParse(props)
    let errors: Notification[] = []

    if (!isValid.success) {
      isValid.error.errors.map((error) => errors.push({ message: error.message.toLowerCase(), key: error.path.join('.').toLowerCase() }))
    }

    return [isValid.success, errors]
  }
}
