// eslint-disable-next-line
import { PrismaClient as PrismaClientData } from '../../generated/pgsql'

// interface QueryOptions {
//   period1: string
//   period2?: string
//   interval?:
//     | '1mo'
//     | '1m'
//     | '2m'
//     | '5m'
//     | '15m'
//     | '30m'
//     | '60m'
//     | '90m'
//     | '1h'
//     | '1d'
//     | '5d'
//     | '1wk'
//     | '3mo'
//     | undefined
// }
/* eslint-disable no-unused-vars */
type GetTimeSeriesDaily = (
  symbol: string,
  period1: string,
  interval:
    | '1mo'
    | '1m'
    | '2m'
    | '5m'
    | '15m'
    | '30m'
    | '60m'
    | '90m'
    | '1h'
    | '1d'
    | '5d'
    | '1wk'
    | '3mo'
) => Promise<any>
/* eslint-enable no-unused-vars */
export const getTimeSeriesDaily: GetTimeSeriesDaily = async (
  symbol = 'AAPL'
  // period1 = '2023-01-01',
  // interval = '3mo'
) => {
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
      })
      console.log(result[0])
      return result
    }

    // TODO: Add check & save results to database
    throw new Error('An error occurred')
  } catch (err: any) {
    // TODO: Add logger
    throw new Error(err.message || 'An error occurred')
  }
}

export default getTimeSeriesDaily
