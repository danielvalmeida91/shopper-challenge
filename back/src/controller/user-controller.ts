import { IUserDTO } from "@/dto/user-dto"
import { UserService } from "@/service/user-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function create(req: FastifyRequest<{Body: IUserDTO}>, reply: FastifyReply) {
  try {
    const { body } = req
  
    const userService = new UserService()
    const output = await userService.createUser(body)
  
    return reply.status(201).send(output)
  } catch (error) {
    const errorrr = error.getError()
    return reply.status(errorrr.statusCode).send(errorrr)
  }
}
