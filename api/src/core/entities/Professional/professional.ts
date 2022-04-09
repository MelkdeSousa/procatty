import { z as zod } from 'zod'

import { PHONE_NUMBER_PT_BT } from '../../constants/regex'
import { Entity } from '../entity'

export interface IProfessionalProps {
  name: string
  bio: string
  email: string
  phone: string
  avatar: string
}

export const professionalSchemaValidation = zod.object({
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

export class Professional extends Entity {
  private props: IProfessionalProps;

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get phone(): string {
    return this.props.phone
  }

  get bio(): string {
    return this.props.bio
  }

  get avatar(): string {
    return this.props.avatar
  }

  constructor(props: IProfessionalProps, id?: string) {
    super(id)
    if (this.isValid(props)) {
      this.props = props
    }

    if (super.errors.length > 0) {
      throw new Error(`${this._errors[0].field}: ${this._errors[0].message}`)
    }
  }

  public isValid(props: IProfessionalProps) {
    const isValid = professionalSchemaValidation.safeParse(props)

    if (!isValid.success) {
      isValid.error.errors.map((error) => this._errors.push({ message: error.message.toLowerCase(), field: error.path.join('.').toLowerCase() }))
    }

    return isValid.success
  }
}
