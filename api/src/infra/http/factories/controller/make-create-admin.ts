import { Controller } from "@core/interfaces/infra/controller"
import { CreateAdmin } from "@core/usecases/CreateAdmin"
import { HashFunction } from "@infra/adapter/helpers/hashFunction"
import { CreateAdminController } from "@infra/http/controllers/create-admin-controller"
import { AdminRepository } from "@infra/repository/prisma/admin"

/**
 * "It creates a controller that creates an admin."
 *
 * The function is a factory function. It creates a controller
 * @returns A function that returns a controller
 */
export const makeCreateAdminController = (): Controller => {
  const hashFunction = new HashFunction()
  const adminRepository = new AdminRepository()
  const adminUseCase = new CreateAdmin(adminRepository, hashFunction)

  const createAdminController = new CreateAdminController(adminUseCase)

  return createAdminController
}
