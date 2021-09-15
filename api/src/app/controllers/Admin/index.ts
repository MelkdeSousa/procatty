import { Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { PrismaClient, Admin } from '@prisma/client'

const { admin } = new PrismaClient()

class AdminController {
  async createAdmin (request: Request, response: Response) {
    const { email, name, username, password } = request.body as Admin

    const adminUsernameExists = await admin.findFirst({
      where: { username }
    })

    if (adminUsernameExists) {
      return response.status(400).json({ message: 'Admin with username already exists' })
    }

    const adminEmailExists = await admin.findFirst({ where: { email } })

    if (adminEmailExists) {
      return response.status(400).json({ message: 'Admin with email already exists' })
    }

    const salt = Number(process.env.SALT_HASH)

    const password_hashed = await hash(password, salt)

    const adminCreated = await admin.create({
      data: {
        name,
        email,
        password: password_hashed,
        username
      },
      select: {
        password: false
      }
    })

    return response.status(201).json(adminCreated)
  }

  async createSession (request: Request, response: Response) {
    const { username, password } = request.body as Admin

    const adminExists = await admin.findFirst({ where: { username } })

    if (!adminExists) {
      return response.status(400).json({ message: 'Admin not exists' })
    }

    const matchPassword = await compare(password, adminExists.password)

    if (!matchPassword) {
      return response
        .status(400)
        .json({ message: 'Incorrect password or username' })
    }

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: adminExists.id,
      expiresIn: '1d',
    })

    return response.status(201).json({
      token,
      admin: {
        ...adminExists,
        password: undefined
      },
    })
  }
}

export default AdminController
