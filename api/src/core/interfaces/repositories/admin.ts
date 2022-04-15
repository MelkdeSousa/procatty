import { IAdminProps } from "@core/entities/admin";

export interface IAdminRepository {
  create(id: string, admin: IAdminProps): Promise<void>
  exists(email: string): Promise<boolean>
  findByEmail(email: string): Promise<IAdminProps | null>
}
