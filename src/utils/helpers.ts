import request from 'request'

export const getDailyData = async (symbol: string) => {
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
