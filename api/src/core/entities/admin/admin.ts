import { Entity } from '@core/entities/entity'
import { AdminValidator } from './admin-validator'

export interface IAdminProps {
  name: string
  email: string
  avatar?: string
  username: string
  password: string
}

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

  get avatar(): string | undefined {
    return this.props.avatar
  }

  get password(): string {
    return this.props.password
  }

  constructor(id: string, props: IAdminProps) {
    super()
    this._id = id
    this.props = props

    this.validate<IAdminProps>(props, new AdminValidator())
  }
}
