import crypto from 'crypto'
import { z as zod } from 'zod'

export const entitySchemaValidation = zod.object({
  _id: zod.string().uuid()
})

export class Entity {
  protected readonly _id: string;

  get id(): string {
    return this._id
  }

  constructor(id?: string) {
    this._id = id ?? crypto.randomUUID()

    this.validate()
  }

  private validate() {
    const { ...valid } = entitySchemaValidation.parse({ _id: this._id })

    return valid
  }
}
