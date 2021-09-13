import { PrismaClient, Address, Professional, Admin, Schedule } from '@prisma/client';

export const { professional, schedule, admin, address } = new PrismaClient()

export interface IProfessional extends Professional { }
export interface IAddress extends Address { }
export interface IAdmin extends Admin { }
export interface ISchedule extends Schedule { }
