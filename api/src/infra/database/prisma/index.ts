import { PrismaClient, Address, Professional, Admin, Schedule, AvailableSchedule } from '@prisma/client'

export const { professional, schedule, admin, address, availableSchedule } = new PrismaClient()

export interface IProfessional extends Professional { }
export interface IAddress extends Address { }
export interface IAdmin extends Admin { }
export interface ISchedule extends Schedule { }
export interface IAvailableSchedule extends AvailableSchedule { }
