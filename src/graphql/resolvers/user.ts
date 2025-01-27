import {
  CreateResponse,
  CreateStockEntry,
  GetPortfolioResults,
  UserDataResponse,
} from '../../generated/graphql'
import logger from '../../logger/Logger'
import { GraphQLContext } from '../../types'
// eslint-disable-next-line
import { PrismaClient } from '../../../prisma/mysql/generated/mysql'

const UserResolver = {
  Query: {
    getCurrentUser: async (
      _parent: any,
      arg: any,
      ctx
    ): Promise<UserDataResponse> => {
      try {
        const currUser = await ctx.req.user
        if (!currUser) {
          return {
            success: false,
            error: 'Unable to find user!',
          }
        }
        return {
          success: true,
          data: currUser,
        }
      } catch (err) {
        logger.error(err)
        return {
          success: false,
          error: JSON.stringify(err),
        }
      }
    },
    getMyPortfolio: async (
      _parent: any,
      arg: any,
      ctx: GraphQLContext
    ): Promise<GetPortfolioResults> => {
      try {
        const currUser = await ctx.req.user
        if (!currUser) {
          return {
            success: false,
            error: 'Unauthorized user!',
          }
        }
        const portfolios = await new PrismaClient().portfolio.findMany({
          where: {
            userId: currUser?.id,
          },
          include: {
            stocks: true,
          },
        })
        return {
          success: true,
          data: portfolios,
        }
      } catch (err) {
        logger.error(err)
        return {
          success: false,
          error: JSON.stringify(err),
        }
      }
    },
  },
  Mutation: {
    createPortfolio: async (
      _parent: any,
      arg: any,
      ctx: GraphQLContext
    ): Promise<CreateResponse> => {
      const currUser = await ctx.req.user
      if (!currUser) {
        return {
          success: false,
          error: 'Unauthorized user!',
        }
      }
      try {
        const portfolio = await new PrismaClient().portfolio.create({
          data: arg.input,
        })
        if (!portfolio) {
          return {
            success: false,
            message: 'Unable to create user portfolio',
          }
        }
        return {
          success: true,
          message: ` Porfolio ${portfolio.name} created successfully!`,
        }
      } catch (err) {
        logger.error(err)
        return {
          success: false,
          error: JSON.stringify(err),
        }
      }
    },
    createStockEntry: async (
      _parent: any,
      arg: any,
      ctx: GraphQLContext
    ): Promise<CreateResponse> => {
      const currUser = await ctx.req.user
      if (!currUser) {
        return {
          success: false,
          error: 'Unauthorized user!',
        }
      }
      const { input }: { input: CreateStockEntry } = arg
      const {
        name,
        ticker,
        quantity,
        purchaseDate,
        totalValue,
        currentPrice,
        portfolioId,
      } = input
      try {
        const existingStock = await new PrismaClient().stock.findUnique({
          where: { ticker },
        })

        if (existingStock) {
          const stockEntry = await new PrismaClient().stock.update({
            where: { ticker },
            data: {
              name,
              ticker,
              quantity,
              purchaseDate,
              totalValue,
              currentPrice,
              portfolioId,
            },
          })
          return {
            success: true,
            message: ` Porfolio ${stockEntry.name} updated successfully!`,
          }
        }
        const stockEntry = await new PrismaClient().stock.create({
          data: {
            name,
            ticker,
            quantity,
            purchaseDate,
            totalValue,
            currentPrice,
            portfolio: {
              connect: {
                id: portfolioId,
              },
            },
          },
        })
        if (!stockEntry) {
          return {
            success: false,
            message: 'Unable to create user portfolio',
          }
        }
        return {
          success: true,
          message: ` Porfolio ${stockEntry.name} created successfully!`,
        }
      } catch (err) {
        logger.error(err)
        return {
          success: false,
          error: JSON.stringify(err),
        }
      }
    },
  },
}

export default UserResolver
