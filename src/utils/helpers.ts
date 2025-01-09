import yahooFinance from 'yahoo-finance2'

interface QueryOptions {
  period1: string
  period2?: string
  interval?:
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
    | undefined
}
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
  symbol = 'AAPL',
  period1 = '2024-01-01',
  interval = '3mo'
) => {
  const queryOptions: QueryOptions = { period1, interval }
  try {
    const result = await yahooFinance.chart(symbol, queryOptions)
    // TODO: Add check & save results to database
    return result
  } catch (err: any) {
    // TODO: Add logger
    throw new Error(err.message || 'An error occurred')
  }
}

export default getTimeSeriesDaily
