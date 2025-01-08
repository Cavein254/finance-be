import request from 'request'
import dotenv from 'dotenv'
import logger from '../logger/Logger'

dotenv.config()

const apiKey = process.env.ALPHA_VANTAGE_API_KEY
export const getTimeSeriesDaily = async (symbol: string) => {
  /*
   * This function retutns the HLOC TIME_SERIES_DAILY
   * of a stock provided the symbol e.g IBM
   * for the past 100 days
   */
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
  return new Promise((resolve, reject) => {
    request.get(
      {
        url,
        json: true,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (err) {
          logger.error(err)
          reject(err)
        } else if (res.statusCode !== 200) {
          logger.error(`Status Code: ${res.statusCode}`)
          reject(new Error(`Status Code: ${res.statusCode}`))
        } else {
          resolve(data)
        }
      }
    )
  })
}

export const getTimeSeriesWeekly = async (symbol: string) => {
  /*
   * This function retutns the HLOC TIME_SERIES_WEEKLY
   * of a stock provided the symbol e.g IBM
   * for 20+ years
   */
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=demo`
  const response = await request.get(
    {
      url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, res, data) => {
      if (err) {
        return { err }
      }
      if (res.statusCode !== 200) {
        return { Status: res.statusCode }
      }
      return { data }
    }
  )
  return response
}
