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

const BATCH_SIZE = 100 // Adjust batch size as needed

/* eslint-disable */
async function loadStockData(dirpath: string) {
  const files = fs.readdirSync(dirpath)

  for (const file of files) {
    const stockSymbolName = path.basename(file, '.csv').toUpperCase()
    const stockSymbol = stockSymbolName.split('.')[0]
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

      for (let i = 0; i < stockDataList.length; i += BATCH_SIZE) {
        const batch = stockDataList.slice(i, i + BATCH_SIZE)

        await prisma.$transaction(
          batch.map(stockInfo =>
            prisma.stockData.upsert({
              where: {
                stockId_date: {
                  stockId: stock.id,
                  date: stockInfo.date,
                },
              },
              update: {
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
          )
        )

        logger.info(
          `Batch ${i / BATCH_SIZE + 1} successfully imported for ${stockSymbol}`
        )
      }
    } catch (error) {
      logger.error(`Error importing ${stockSymbol}`, error)
    }
  }
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
