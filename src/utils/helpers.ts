import request from 'request'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.ALPHA_VANTAGE_API_KEY
export const getDailyData = async (symbol: string) => {
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
          reject(err)
        } else if (res.statusCode !== 200) {
          reject(new Error(`Status Code: ${res.statusCode}`))
        } else {
          resolve(data)
        }
      }
    )
  })
}

export const getSingleDailyData = async (symbol: string) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`
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
