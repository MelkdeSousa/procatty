import { IAdminProps } from "@core/entities/admin";
import { IAdminRepository } from "@core/interfaces/repositories/admin";

export class MemoryRepository implements IAdminRepository {

  private admins: ({ id: string } & IAdminProps)[] = [];

  public async create(id: string, admin: IAdminProps): Promise<void> {
    this.admins.push({
      id,
      ...admin
    })
  }

  public async exists(email: string): Promise<boolean> {
    return this.admins.some(admin => admin.email === email);
  }

  public async findByEmail(email: string): Promise<IAdminProps | null> {
    return this.admins.find(admin => admin.email === email) || null;
  }
}
