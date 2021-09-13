import { Request, Response } from 'express'

import { address, IAddress } from '../../../infra/database/prisma'

class AddressController {
  async getAddresses (_request: Request, response: Response) {
    const addresses = await address.findMany({ include: { professional: true } })

    return response.status(200).json(addresses)
  }

  async createAddress (request: Request, response: Response) {
    const {
      postal_code,
      state,
      city,
      district,
      street,
      number,
      professional_id
    } = request.body as IAddress

    const addressExists = await address.findFirst({
      where: {
        postal_code,
        district,
        street,
        number,
        professional_id
      },
    })

    if (addressExists) {
      return response.json({ message: 'Address already exists to professional' })
    }

    const addressCreated = await address.create({
      data: {
        postal_code,
        state,
        city,
        district,
        street,
        number,
        professional_id
      }
    })

    return response.json(addressCreated)
  }

  async updateAddress (request: Request, response: Response) {
    const {
      id,
      postal_code,
      state,
      city,
      district,
      street,
      number
    } = request.body as IAddress

    const addressExists = await address.findFirst({ where: { id } })

    if (!addressExists) {
      return response.json({ message: 'Address does not exist' })
    }

    const addressUpdated = await address.update({
      where: { id }, data: {
        postal_code,
        state,
        city,
        district,
        street,
        number
      }
    })

    return response.status(200).json(addressUpdated)

  }

  async deleteAddress (request: Request, response: Response) {
    const { id } = request.params

    await address.delete({ where: { id } })

    return response.status(204)
  }

  async getAddressById (request: Request, response: Response) {
    const { id } = request.params

    const addressExists = await address.findFirst({ where: { id } })

    if (!addressExists) {
      return response.status(400).json({ message: 'Address not exists.' })
    }

    return response.status(200).json(addressExists)
  }
}

export default AddressController
