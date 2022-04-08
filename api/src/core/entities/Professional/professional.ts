import { z as zod } from 'zod'

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
    .max(256, { message: 'bio must have at most 256 characters' }),
  phone: zod
    .string()
    .regex(
      // regex mobile phone number pt-BR
      /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm,
      { message: 'phone is invalid' })
    .nonempty({ message: 'phone is required' })
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
  private _errors: {
    message: string,
    field: string
  }[] = []

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

  get errors(): ReadonlyArray<{ message: string, field: string }> { return this._errors }

  constructor(props: IProfessionalProps, id?: string) {
    super(id)
    if (this.isValid(props)) {
      this.props = props
    }

    if (this._errors.length > 0) {
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

const props: IProfessionalProps = {
  name: 'Melk de Sousa',
  avatar: 'https://github.com/melkdesousa.png',
  bio: 'I am a professional',
  email: 'melk@gmail.com',
  phone: '91986043359'
}

const assert = new Professional(props)

console.log(assert.errors)
