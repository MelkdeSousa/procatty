import { Request, Response } from 'express'
import toSchedule from '../../utils/toSchedule'

import { availableSchedule, IAvailableSchedule } from '../../../infra/database/prisma'

class AvailableScheduleController {
  async getSchedules (_request: Request, response: Response) {
    const schedules = await availableSchedule.findMany({ include: { professional: true } })

    return response.status(200).json(schedules)
  }

  async createSchedule (request: Request, response: Response) {
    const {
      professional_id,
      start_date_time,
      end_date_time
    } = request.body as IAvailableSchedule

    const scheduleFormatted = toSchedule(start_date_time, end_date_time)

    const scheduleExist = await availableSchedule.findFirst({
      where: {
        professional: { id: professional_id },
        professional_id,
        start_date_time: scheduleFormatted.start_date_time,
        end_date_time: scheduleFormatted.end_date_time
      }
    })

    if (scheduleExist) {
      return response.status(400).json({ message: 'Schedule already exists to professional' })
    }

    const scheduleCreated = await availableSchedule.create({
      data: {
        professional_id,
        ...scheduleFormatted
      }
    })

    return response.json(scheduleCreated)
  }

  async updateSchedule (request: Request, response: Response) {
    const {
      id,
      start_date_time,
      end_date_time
    } = request.body as IAvailableSchedule

    const scheduleExists = await availableSchedule.findFirst({
      where: { id }
    })

    const scheduleFormatted = toSchedule(start_date_time, end_date_time)

    if (!scheduleExists) {
      return response.json({ message: 'Schedule does not exist' })
    }

    const scheduleUpdated = await availableSchedule.update({
      where: { id },
      data: {
        ...scheduleFormatted
      }
    })

    return response.status(200).json(scheduleUpdated)

  }

  async deleteSchedule (request: Request, response: Response) {
    const { id } = request.params

    await availableSchedule.delete({ where: { id } })

    return response.status(204)
  }

  async getScheduleById (request: Request, response: Response) {
    const { id } = request.params

    const scheduleExists = await availableSchedule.findFirst({ where: { id } })

    if (!scheduleExists) {
      return response.status(400).json({ message: 'Schedule not exists.' })
    }

    return response.status(200).json(scheduleExists)
  }
}

export default AvailableScheduleController
