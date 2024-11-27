export type ErrorPayload = {
  message: string
  code: string
  statusCode: number
}

export const Errors: Record<string, ErrorPayload> = {
  CUSTOMER_ALREADY_EXISTS: {
    message: 'E-mail não disponível para cadastro.',
    code: 'CUSTOMER_ALREADY_EXISTS',
    statusCode: 409
  },
  ADDRESS_NOT_FOUND: {
    message: 'Address not found.',
    code: 'ADDRESS_NOT_FOUND',
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
  },
  INVALID_DRIVER: {
    message: 'Motorista inválido',
    code: 'INVALID_DRIVER',
    statusCode: 400
  },
  NO_RIDES_FOUND: {
    message: 'Nenhum registro encontrado',
    code: 'NO_RIDES_FOUND',
    statusCode: 404
  },
}


export class CustomErrors extends Error {
  constructor(payload: ErrorPayload) {
    super(JSON.stringify(payload))
  }
  getError() {
    return JSON.parse(this.message)
  }
}


