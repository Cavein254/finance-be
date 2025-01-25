import logger from '../../logger/Logger'
// eslint-disable-next-line
import { PrismaClient as PrismaClientData } from '../../../generated/pgsql'
import { GetStockDataResponse } from '../../generated/graphql'

const StockResolvers = {
  Query: {
    getHistoricalData: async (
      _parent: any,
      { symbol }
    ): Promise<GetStockDataResponse> => {
      try {
        const stockName = await new PrismaClientData().stock.findFirst({
          where: {
            ticker: symbol,
          },
        })
        if (stockName) {
          const result = await new PrismaClientData().stockData.findMany({
            where: {
              stockId: stockName.id,
            },
            orderBy: {
              date: 'desc',
            },
          })

          return {
            success: true,
            data: result,
          }
        }
        return {
          success: false,
          error: `Unable to load data for stock ticker ${symbol}`,
        }
      } catch (err: any) {
        logger.error(err)
        return {
          success: false,
          error: '',
        }
      }
    },
    getHistoricalFirstRow: async () => {
      try {
        const stocks = await new PrismaClientData().stock.findMany({
          take: 100,
          include: {
            stockData: {
              take: 1,
              orderBy: {
                date: 'desc',
              },
            },
          },
        })
        const stocksWithData = stocks?.filter(
          stock => stock?.stockData.length > 0
        )

        return {
          success: true,
          data: stocksWithData,
        }
      } catch (err: any) {
        logger.error(err)
        return {
          success: false,
          error: '',
        }
      }
    },
  },
}

export default StockResolvers
