import { Admin } from '@core/entities/admin'
import { IHashFunction } from '@core/interfaces/helpers/hash-function'
import { IAdminRepository } from '@core/interfaces/repositories/admin'
import { ICommand } from '@core/logic/command'
import { ICreateAdminDTOInput, ICreateAdminDTOOutput, } from '@core/usecases/create-admin/create-admin-dto'
import { randomUUID } from 'crypto'

export interface ICreateAdminProps {
  readonly _repository: IAdminRepository
  readonly _hashFunction: IHashFunction
}

export class CreateAdmin implements ICreateAdminProps, ICommand<ICreateAdminDTOInput, ICreateAdminDTOOutput> {
  constructor(
    public readonly _repository: IAdminRepository,
    public readonly _hashFunction: IHashFunction
  ) { }

  public async execute(adminDTO: ICreateAdminDTOInput): Promise<ICreateAdminDTOOutput> {
    const id = randomUUID()

    const { avatar, name, email, password, username, valid, errors } = new Admin(id, {
      name: adminDTO.name,
      email: adminDTO.email,
      avatar: adminDTO.avatar,
      username: adminDTO.username,
      password: adminDTO.password
    })

    if (!valid) {
      return {
        success: false,
        message_error: errors.getAll()[0].message
      }
    }

    const passwordHashed = await this._hashFunction.execute(password)

    await this._repository.create(id, {
      avatar,
      name,
      email,
      username,
      password: passwordHashed,
    })

    return {
      success: true
    }
  }
}
