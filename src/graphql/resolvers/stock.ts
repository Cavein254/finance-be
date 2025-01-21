import getTimeSeriesDaily from '../../utils/helpers'
import logger from '../../logger/Logger'

const StockResolvers = {
  Query: {
    getTimeSeriesDaily: async (_parent: any, { symbol, period1, interval }) => {
      try {
        const data: any = await getTimeSeriesDaily(symbol, period1, interval)
        return { success: true, data }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
  },
}

export default StockResolvers
