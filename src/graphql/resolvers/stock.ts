import { getTimeSeriesDaily, getTimeSeriesWeekly } from '../../utils/helpers'
import logger from '../../logger/Logger'
import { GetStockDataResponse } from '../../generated/graphql'

const StockResolvers = {
  Query: {
    getTimeSeriesDaily: async (
      _parent: any,
      { symbol }
    ): Promise<GetStockDataResponse> => {
      try {
        const data: any = await getTimeSeriesDaily(symbol)
        if (data) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        console.log(data)
        return { success: true, data: data['Time Series (Daily)'] }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
    getTimeSeriesWeekly: async (
      _parent: any,
      { symbol }
    ): Promise<GetStockDataResponse> => {
      try {
        const data: any = await getTimeSeriesWeekly(symbol)
        if (data['Error Message']) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        return { success: true, data: data['Time Series (Daily)'] }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
  },
}

export default StockResolvers
