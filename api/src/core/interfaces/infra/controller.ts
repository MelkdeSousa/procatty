import { HttpResponse } from '@core/logic/http-response'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
