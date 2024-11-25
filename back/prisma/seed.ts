import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function seed(){
  await prisma.user.create({
    data: {
      id: 1,
      name: 'John',
      email: 'john@email.com',
      password_hash: await hash('123456', 6),
    }
  })
  
  await prisma.user.create({
    data: {
      id: 2,
      name: 'Marie',
      email: 'marie@email.com',
      password_hash: await hash('1234567', 6),
    }
  })

  await prisma.driver.create({
    data: {
      id: 1,
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      ratePerKm: 2.5,
      minKm: 1
    }
  })

  await prisma.driver.create({
    data: {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      car: 'Dodge Charger R/T 1970 modificado',
      ratePerKm: 5,
      minKm: 5
    }
  })
  
  await prisma.driver.create({
    data: {
      id: 3,
      name: 'James Bond',
      description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      car: 'Aston Martin DB5 clássico',
      ratePerKm: 10,
      minKm: 10
    }
  })

  await prisma.rating.create({
    data: {
      user_id: 1,
      driver_id: 1,
      description: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      score: 2
    }
  })
    
  await prisma.rating.create({
    data: {
      user_id: 1,
      driver_id: 2,
      description: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      score: 4
    }
  })

  await prisma.rating.create({
    data: {
      user_id: 1,
      driver_id: 3,
      description: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      score: 5
    }
  })

}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })