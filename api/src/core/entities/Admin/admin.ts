import { PASSWORD_STRONG, USERNAME } from '../../constants/regex'
import { z as zod } from 'zod'

import { Entity } from '../entity'

export interface IAdminProps {
  name: string
  email: string
  avatar: string
  username: string
  password: string
}

export const adminSchemaValidation = zod.object({
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
    .url({ message: 'url to avatar is invalid' }),
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

export class Admin extends Entity {
  private props: IAdminProps;

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get username(): string {
    return this.props.username
  }

  get avatar(): string {
    return this.props.avatar
  }

  constructor(props: IAdminProps, id?: string) {
    super(id)
    if (this.isValid(props)) {
      this.props = props
    }

    if (super.errors.length > 0) {
      throw new Error(`${this._errors[0].field}: ${this._errors[0].message}`)
    }
  }

  public isValid(props: IAdminProps) {
    const isValid = adminSchemaValidation.safeParse(props)

    if (!isValid.success) {
      isValid.error.errors.map((error) => this._errors.push({ message: error.message.toLowerCase(), field: error.path.join('.').toLowerCase() }))
    }

    return isValid.success
  }
}
