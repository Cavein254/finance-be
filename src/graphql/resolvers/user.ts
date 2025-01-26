import { GetPortfolioResults, UserDataResponse } from '../../generated/graphql'
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
        const portfolios = await new PrismaClient().portfolio.findMany()
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
}

export default UserResolver
