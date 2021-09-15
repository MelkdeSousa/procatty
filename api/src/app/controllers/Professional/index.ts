import { Request, Response } from 'express'

import { IProfessional, professional, schedule } from '../../../infra/database/prisma'
import toSchedule from '../../utils/toSchedule'

class ProfessionalController {
  async getProfessionals (_request: Request, response: Response) {
    const professionals = await professional.findMany({
      include: {
        addresses: true,
        available_schedules: true,
        schedules: true
      }
    })

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

  async createScheduleToProfessional (request: Request, response: Response) {
    const { id } = request.params

    const {
      name,
      email,
      telephone,
      start_date_time,
      end_date_time
    } = request.body

    const scheduleFormatted = toSchedule(start_date_time, end_date_time)

    const scheduleExists = await schedule.findFirst({
      where: {
        start_date_time: scheduleFormatted.start_date_time,
        end_date_time: scheduleFormatted.end_date_time,
      }
    })

    if (scheduleExists) {
      return response.status(400).json({ message: 'Schedule already exists to professional' })
    }

    const scheduleCreated = await schedule.create({
      data: {
        name,
        email,
        telephone,
        professional_id: id,
        ...scheduleFormatted
      }
    })

    return response.status(201).json(scheduleCreated)
  }

  async updateProfessional (request: Request, response: Response) {
    const { id, name, description, email, phone, avatar } = request.body as IProfessional

    const professionalExists = await professional.findFirst({ where: { email: email } })

    if (!professionalExists) {
      return response.status(400).json({ message: 'Professional not exists.' })
    }

    const professionalUpdated = await professional.update({ where: { id }, data: { name, description, email, phone, avatar } })

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

    return response.status(204).json()
  }
}

export default ProfessionalController
