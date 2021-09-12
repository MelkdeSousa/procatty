interface IResponse {
  message: string
  success: boolean
  data?: any
}

class ResponseViewModel {
  constructor (_response: IResponse) { }
}

export default ResponseViewModel
