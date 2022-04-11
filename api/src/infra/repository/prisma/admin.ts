import { IAdminProps } from "@core/entities/Admin";
import { IAdminRepository } from "@core/interfaces/repositories/admin";
import { prismaClient } from '@infra/database/prisma'

export class AdminRepository implements IAdminRepository {
  public async create(id: string, admin: IAdminProps): Promise<void> {
    await prismaClient.admin.create({
      data: {
        id,
        ...admin,
      }
    })
  }

  async exists(email: string): Promise<boolean> {
    const admin = await prismaClient.admin.findFirst({
      where: {
        email
      },
      select: {
        id: true
      }
    })

    return !!admin
  }

  async findByEmail(email: string): Promise<IAdminProps | null> {
    const admin = await prismaClient.admin.findFirst({
      where: {
        email
      }
    })

    return admin
  }
}
