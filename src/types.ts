import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

export interface GraphQLContext {
  prisma: PrismaClient
  req?: Request
  res?: any
}
