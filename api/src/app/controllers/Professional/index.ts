import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'

import { professional } from '../../../infra/database/prisma'

class ProfessionalController {
  async getProfessionals (_request: Request, response: Response) {
    const professionals = await professional.findMany()

    return response.json(professionals)
  }

  async createProfessional (request: Request, response: Response) {
    const { name, description, email, phone, avatar } = request.body

    const professionalExists = await professional.findFirst({ where: { email } })

    if (professionalExists) {
      return response.status(400).json({ message: 'Professional already exists' })
    }

    const professionalCreated = await professional.create({ data: { name, description, email, phone, avatar } })

    return response.status(201).json(professionalCreated)
  }

  async updateProfessional (request: Request, response: Response) {
    const { name, description, email, phone, avatar } = request.body as Prisma.ProfessionalUpdateInput

    const professionalExists = await professional.findFirst({ where: { email: email?.toString() } })

    if (!professionalExists) {
      return response.status(400).json({ message: 'Professional not exists.' })
    }

    const professionalUpdated = await professional.update({ where: { email: email?.toString() }, data: { name, description, email, phone, avatar } })

    return response.status(200).json(professionalUpdated)
  }

  async getProfessionalById (request: Request, response: Response) {
    const { id } = request.params

    const professionalExists = await professional.findFirst({ where: { id } })

    if (!professionalExists) {
      return response.status(400).json({ message: 'Professional not exists.' })
    }

    return response.status(200).json(professionalExists)
  }

  async deleteProfessional (request: Request, response: Response) {
    const { id } = request.params

    await professional.delete({ where: { id } })

    return response.status(204)
  }
}

export default ProfessionalController
