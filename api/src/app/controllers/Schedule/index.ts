import { Request, Response } from 'express'

import { schedule, ISchedule } from '../../../infra/database/prisma'

const toSchedule = (start: Date, end: Date) => {
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)

  const startDate = startDateTime.toLocaleDateString()
  const endDate = endDateTime.toLocaleDateString()

  const startTime = startDateTime.toTimeString()
  const endTime = endDateTime.toTimeString()

  return {
    start_date_time: startDateTime,
    end_date_time: endDateTime,
    start_date: startDate,
    end_date: endDate,
    start_time: startTime,
    end_time: endTime,
  }
}

class ScheduleController {
  async getSchedules (_request: Request, response: Response) {
    const schedules = await schedule.findMany({ include: { professional: true } })

    return response.status(200).json(schedules)
  }

  async createSchedule (request: Request, response: Response) {
    const {
      professional_id,
      start_date_time,
      end_date_time
    } = request.body as ISchedule

    const scheduleDTO = toSchedule(start_date_time, end_date_time)

    const scheduleExist = await schedule.findFirst({
      where: {
        professional: { id: professional_id },
        professional_id,
        start_date_time: scheduleDTO.start_date_time,
        end_date_time: scheduleDTO.end_date_time
      }
    })

    if (scheduleExist) {
      return response.status(400).json({ message: 'Schedule already exists to professional' })
    }

    const scheduleCreated = await schedule.create({
      data: {
        professional_id,
        ...scheduleDTO
      }
    })

    return response.json(scheduleCreated)
  }

  async updateSchedule (request: Request, response: Response) {
    const {
      id,
      start_date_time,
      end_date_time
    } = request.body as ISchedule

    const scheduleExists = await schedule.findFirst({
      where: { id }
    })

    const scheduleDTO = toSchedule(start_date_time, end_date_time)

    if (!scheduleExists) {
      return response.json({ message: 'Schedule does not exist' })
    }

    const scheduleUpdated = await schedule.update({
      where: { id },
      data: {
        ...scheduleDTO
      }
    })

    return response.status(200).json(scheduleUpdated)

  }

  async deleteSchedule (request: Request, response: Response) {
    const { id } = request.params

    await schedule.delete({ where: { id } })

    return response.status(204)
  }

  async getScheduleById (request: Request, response: Response) {
    const { id } = request.params

    const scheduleExists = await schedule.findFirst({ where: { id } })

    if (!scheduleExists) {
      return response.status(400).json({ message: 'Schedule not exists.' })
    }

    return response.status(200).json(scheduleExists)
  }
}

export default ScheduleController
