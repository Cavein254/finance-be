/*
  Warnings:

  - A unique constraint covering the columns `[stockId,date]` on the table `StockData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StockData_stockId_key";

-- CreateIndex
CREATE UNIQUE INDEX "StockData_stockId_date_key" ON "StockData"("stockId", "date");
