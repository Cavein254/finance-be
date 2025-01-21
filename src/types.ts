import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

declare global {
  namespace Express {
    interface User {
      id: string
      email: string
      image: string
    }

    interface Request {
      user?: User
      session?: any
    }
  }
}

export interface GraphQLContext {
  prisma: PrismaClient
  req?: Request
  res?: any
}
