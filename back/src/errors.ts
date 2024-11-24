export type ErrorPayload = {
  message: string
  code: string
  statusCode: number
}

export const Erros: Record<string, ErrorPayload> = {
  USER_ALREADY_EXISTS: {
    message: 'E-mail already exists.',
    code: 'USER_ALREADY_EXISTS',
    statusCode: 409
  }
}


export class CustomErrors extends Error {
  constructor(payload: ErrorPayload) {
    super(JSON.stringify(payload))
  }
  getError() {
    return JSON.parse(this.message)
  }
}


