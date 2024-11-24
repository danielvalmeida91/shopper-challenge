import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { create } from "./controller/user-controller"

export const app = fastify()

export const prisma = new PrismaClient()

prisma.user.create({
  data:{
    name: "Daniel",
    email: "daniel@gmail.com"
  }
})

app.get("/", (req, res) => {
  res.send({ message: "Hello World"})
})

app.post("/user", create)
