import { Controller } from '@core/interfaces/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
} from '@core/logic/http-response'

import { CreateAdmin } from '@core/usecases/CreateAdmin'

type CreateAdminControllerRequest = {
  name: string
  email: string
  password: string
  username: string
  avatar?: string
}

export class CreateAdminController implements Controller {
  constructor(private createAdmin: CreateAdmin) { }

  async handle({
    name,
    email,
    password,
    username,
    avatar,
  }: CreateAdminControllerRequest): Promise<HttpResponse> {

    const { success, message_error } = await this.createAdmin.execute({
      name,
      email,
      password,
      username,
      avatar,
    })

    if (success)
      return created()

    return clientError(message_error!)
  }
}
