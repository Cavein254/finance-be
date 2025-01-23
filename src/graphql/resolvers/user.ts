import { UserDataResponse } from '../../generated/graphql'
import logger from '../../logger/Logger'

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
  },
}

export default UserResolver
