import {
  getNewsSentiment,
  getTimeSeriesDaily,
  getTimeSeriesWeekly,
} from '../../utils/helpers'
import logger from '../../logger/Logger'
import { GetStockDataResponse } from '../../generated/graphql'
import { weeklyStockData } from '../../data/weekly'
import { dailyStockData } from '../../data/daily'
import { newSediments } from '../../data/news'

const StockResolvers = {
  Query: {
    getTimeSeriesDaily: async (
      _parent: any,
      { symbol }
    ): Promise<GetStockDataResponse> => {
      try {
        // const data: any = await getTimeSeriesDaily(symbol)
        const data: any = dailyStockData
        if (data['Error Message']) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        const timeSeriesData = data['Time Series (Daily)']
        const transformedData = Object.entries(timeSeriesData).map(
          ([date, values]) => {
            const valueObj = values as {
              '1. open': string
              '2. high': string
              '3. low': string
              '4. close': string
              '5. volume': string
            }

            return {
              date,
              open: valueObj['1. open'],
              high: valueObj['2. high'],
              low: valueObj['3. low'],
              close: valueObj['4. close'],
              volume: valueObj['5. volume'],
            }
          }
        )
        return { success: true, data: transformedData }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
    getTimeSeriesWeekly: async (_parent: any, { symbol }) => {
      try {
        // const data: any = await getTimeSeriesWeekly(symbol)
        const data: any = weeklyStockData
        if (data['Error Message']) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        const timeSeriesData = data['Weekly Adjusted Time Series']
        const transformedData = Object.entries(timeSeriesData).map(
          ([date, values]) => {
            const valueObj = values as {
              '1. open': string
              '2. high': string
              '3. low': string
              '4. close': string
              '5. volume': string
            }

            return {
              date,
              open: valueObj['1. open'],
              high: valueObj['2. high'],
              low: valueObj['3. low'],
              close: valueObj['4. close'],
              volume: valueObj['5. volume'],
            }
          }
        )
        return { success: true, data: transformedData }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
    getNewsSentiment: async (_parent: any, { symbol }) => {
      try {
        // const data: any = await getNewsSentiment(symbol)
        const data: any = newSediments
        if (data['Error Message']) {
          logger.error(data['Error Message'])
          return { success: false, error: data['Error Message'] }
        }
        const news = data['feed']
        return { success: true, data: news }
      } catch (error) {
        logger.error(error)
        return { success: false, error: JSON.stringify(error) }
      }
    },
  },
}

export default StockResolvers
