import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'
// eslint-disable-next-line
import { PrismaClient } from '../../generated/pgsql'
import logger from '../logger/Logger'

const prisma = new PrismaClient()

interface StockData {
  name?: string
  ticker?: string
  date: Date
  open: number
  high: number
  low: number
  close: number
  volume?: bigint
  openInt?: number
}

async function loadStockData(dirpath: string) {
  const files = fs.readdirSync(dirpath)

  await Promise.all(
    files.map(async file => {
      const stockSymbol = path.basename(file, '.csv').toUpperCase()
      const filepath = path.join(dirpath, file)
      const stockDataList: Array<StockData> = []

      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filepath)
          .pipe(csv())
          .on('data', data => {
            stockDataList.push({
              date: new Date(data.Date),
              open: parseFloat(data.Open),
              high: parseFloat(data.High),
              low: parseFloat(data.Low),
              close: parseFloat(data.Close),
              volume: BigInt(data.Volume),
              openInt: parseInt(data.OpenInt, 10),
            })
          })
          .on('end', resolve)
          .on('error', reject)
      })

      try {
        const stock = await prisma.stock.upsert({
          where: { ticker: stockSymbol },
          update: {},
          create: {
            name: stockSymbol,
            ticker: stockSymbol,
          },
        })

        await Promise.all(
          stockDataList.map(async stockInfo => {
            prisma.stockData.upsert({
              where: {
                stockId: stock.id,
              },
              update: {
                date: stockInfo.date,
                open: stockInfo.open,
                close: stockInfo.close,
                high: stockInfo.high,
                low: stockInfo.low,
                volume: stockInfo.volume,
                openInt: stockInfo.openInt,
              },
              create: {
                date: stockInfo.date,
                open: stockInfo.open,
                close: stockInfo.close,
                high: stockInfo.high,
                low: stockInfo.low,
                volume: stockInfo.volume,
                openInt: stockInfo.openInt,
                stockId: stock.id,
              },
            })
          })
        )
        logger.info(`successfully imported ${stockSymbol}`)
      } catch (error) {
        logger.error(`Error importing ${stockSymbol}`, error)
      }
    })
  )
}

loadStockData('/home/cavein/Downloads/archive/Data/Stocks')
  .then(() => {
    logger.info('CSV data processing complete.')
    prisma.$disconnect()
  })
  .catch(error => {
    logger.error('Error processing CSV data:', error)
    prisma.$disconnect()
  })
