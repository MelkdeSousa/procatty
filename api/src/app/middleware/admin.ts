import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { admin } from '../../infra/database/prisma';

export const decoder = async (request: Request) => {
  const authHeader = request.headers.authorization || ''

  const [bearer, token] = authHeader?.split(' ')

  if (bearer !== 'Bearer') {
    return
  }

  const payload = decode(token)

  const adminExists = await admin.findFirst({ where: { id: payload?.sub?.toString() } })

  return adminExists
}

export const isAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const adminExists = await decoder(request)

  if (adminExists) {
    return next()
  }

  return response.status(401).json({ message: 'Unauthorized' })
}
