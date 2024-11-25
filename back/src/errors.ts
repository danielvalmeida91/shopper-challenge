export type ErrorPayload = {
  message: string
  code: string
  statusCode: number
}

export const Errors: Record<string, ErrorPayload> = {
  USER_ALREADY_EXISTS: {
    message: 'E-mail already exists.',
    code: 'USER_ALREADY_EXISTS',
    statusCode: 409
  },
  ORIGIN_AND_DESTINATION_ARE_THE_SAME: {
    message: 'Origin and destination cannot be the same.',
    code: 'ORIGIN_AND_DESTINATION_ARE_THE_SAME',
    statusCode: 400
  },
  USER_NOT_FOUND: {
    message: 'User not found.',
    code: 'USER_NOT_FOUND',
    statusCode: 404
  },
  ADRESS_NOT_FOUND: {
    message: 'Address not found.',
    code: 'ADRESS_NOT_FOUND',
    statusCode: 404
  },
  DISTANCE_NOT_FOUND: {
    message: 'Distance not found.',
    code: 'DISTANCE_NOT_FOUND',
    statusCode: 404
  },
  DRIVER_NOT_FOUND: {
    message: 'Motorista não encontrado',
    code: 'DRIVER_NOT_FOUND',
    statusCode: 404
  },
  INVALID_DATA: {
    message: 'Os dados fornecidos no corpo da requisição são inválidos',
    code: 'INVALID_DATA',
    statusCode: 400
  },
  INVALID_DISTANCE: {
    message: 'Quilometragem inválida para o motorista',
    code: 'INVALID_DISTANCE',
    statusCode: 406
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


