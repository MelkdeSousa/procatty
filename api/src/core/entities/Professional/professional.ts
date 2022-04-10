import { Entity } from '../entity'
import { ProfessionalValidator } from './professionalValidator'

export interface IProfessionalProps {
  name: string
  bio: string
  email: string
  phone: string
  avatar: string
}

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

  constructor(id: string, props: IProfessionalProps) {
    super()
    this._id = id
    this.props = props

    this.validate<IProfessionalProps>(props, new ProfessionalValidator())
  }
}
