import { PrismaClient } from "@prisma/client"
import fastify from "fastify"

export const app = fastify()

const prisma = new PrismaClient()

function teste() {
  return "teste"
}

teste()

prisma.user.create({
  data:{
    name: "Daniel",
    email: "daniel@gmail.com"
  }
})

app.get("/", (req, res) => {
  res.send({ message: "Hello World"})
})
