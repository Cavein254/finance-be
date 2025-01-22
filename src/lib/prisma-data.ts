// eslint-disable-next-line
import { PrismaClient } from '../../generated/pgsql'

const prismaData = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  }
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient()
  }
  // @ts-ignore
  return global.prisma
})()

export default prismaData
