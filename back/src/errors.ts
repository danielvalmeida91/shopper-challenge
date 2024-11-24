export const Erros = {
  USER_ALREADY_EXISTS: {
    message: "User already exists",
    code: "USER_ALREADY_EXISTS",
    statusCode: 400
  }
}


export class MyError extends Error {
  public payload: any
  
  constructor(payload: any) {
    super(JSON.stringify(payload))
  }
  getError() {
    return JSON.parse(this.message)
  }
}
