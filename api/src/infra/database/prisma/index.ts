import { PrismaClient } from '@prisma/client';

export const { professional, schedule, admin, address } = new PrismaClient()
