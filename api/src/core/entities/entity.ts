import crypto from 'crypto'
import { z as zod } from 'zod'

export const entitySchemaValidation = zod.object({
  id: zod.string().uuid({ message: 'id is invalid' })
})

export class Entity {
  protected readonly _id: string;
  protected _errors: {
    message: string,
    field: string
  }[] = []

  get id(): string {
    return this._id
  }

  get errors(): ReadonlyArray<{ message: string, field: string }> { return this._errors }

  constructor(id?: string) {
    if (id && this.idIsValid(id)) {
      this._id = id
    }

    if (!id) {
      this._id = crypto.randomUUID()
    }

    if (this._errors.length > 0) {
      throw new Error(`${this._errors[0].field}: ${this._errors[0].message}`)
    }
  }

  private idIsValid(id: string) {
    const isValid = entitySchemaValidation.safeParse({ id: id })

    if (!isValid.success) {
      isValid.error.errors.map((error) => this._errors.push({ message: error.message.toLowerCase(), field: error.path.join('.').toLowerCase() }))
    }

    return isValid.success
  }
}
