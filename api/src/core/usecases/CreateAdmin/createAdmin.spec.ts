import { IAdminRepository } from "@core/interfaces/repositories/admin";
import { HashFunction } from "@infra/adapter/helpers/hashFunction";
import { MemoryRepository } from "@infra/repository/memory/admin";

import { CreateAdmin } from "./CreateAdmin";
import { ICreateAdminDTOInput, ICreateAdminDTOOutput } from "./CreateAdminDTO";

describe('Create Admin use case', () => {
  let adminRepository: IAdminRepository;
  let createAdmin: CreateAdmin;

  beforeEach(() => {
    adminRepository = new MemoryRepository();
    createAdmin = new CreateAdmin(adminRepository, new HashFunction());
  })

  it('should create a new Admin', async () => {
    const input: ICreateAdminDTOInput = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      username: 'melkdesousa',
      email: 'melk@gmail.com',
      password: '99wBInra0hgXQ1H@'
    }

    const expectedOutput: ICreateAdminDTOOutput = {
      success: true
    }

    const output = await createAdmin.execute(input)

    expect(adminRepository.exists(input.email)).resolves.toBeTruthy()
    expect(output).toEqual(expectedOutput)
  })
})
