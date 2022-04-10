import { Notification } from "@core/logic/notification";

export interface IValidator<T> {
  validate(value: T): [boolean, Notification[]]
}
