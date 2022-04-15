import { Request, Response } from 'express'

import { Controller } from '@core/interfaces/infra/controller'

/**
 * It receives a controller and returns a function that receives a request and a response and returns a
 * response
 * @param {Controller} controller - Controller - The controller that will handle the request.
 * @returns A function that takes a controller and returns a function that takes a request and
 * response.
 */
export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
    }

    const httpResponse = await controller.handle(requestData)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
    }
  }
}
