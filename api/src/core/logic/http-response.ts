export type HttpResponse = {
  statusCode: number
  body: any
}

export const ok = <T>(dto?: T): HttpResponse => {
  return {
    statusCode: 200,
    body: dto,
  }
}

export const created = (): HttpResponse => {
  return {
    statusCode: 201,
    body: undefined,
  }
}

export const clientError = (error: string): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      error: error,
    },
  }
}

export const unauthorized = (error: Error): HttpResponse => {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  }
}

export const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  }
}

export const notFound = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  }
}

export const conflict = (error: Error): HttpResponse => {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  }
}

export const tooMany = (error: Error): HttpResponse => {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  }
}

export const fail = (error: Error) => {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  }
}
