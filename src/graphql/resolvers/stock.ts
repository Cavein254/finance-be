import { getDailyData } from '../../utils/helpers'
import logger from '../../logger/Logger'

const StockResolvers = {
  Query: {
    getStockData: async (_parent: any, { symbol }) => {
      try {
        const data: any = await getDailyData(symbol)
        if (data['Error Message']) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        return { success: true, data: data['Time Series (Daily)'] }
      } catch (error) {
        logger.error(error)
        return { success: false, error }
      }
    },
  },
}

export default StockResolvers
