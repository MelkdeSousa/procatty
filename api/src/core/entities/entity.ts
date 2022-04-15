import { Notifications } from '@core/logic/notification';
import { IValidator } from '@core/interfaces/helpers/validator';

export abstract class Entity {
  protected _id: string;
  public valid: boolean
  public readonly errors: Notifications

  get id (): string {
    return this._id
  }

  protected set id (value: string) {
    this._id = value
  }

  constructor () {
    this.valid = false
    this.errors = new Notifications()
  }

  public validate<IProps> (props: IProps, validator: IValidator<IProps>): boolean {
    const [valid, errors] = validator.validate(props)

    this.valid = valid
    this.errors.addAll(errors)

    return valid
  }
}
