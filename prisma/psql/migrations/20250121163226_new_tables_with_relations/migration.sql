/*
  Warnings:

  - You are about to drop the `StockName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StockName";

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockData" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "open" DOUBLE PRECISION,
    "high" DOUBLE PRECISION,
    "low" DOUBLE PRECISION,
    "close" DOUBLE PRECISION,
    "volume" BIGINT,
    "stockId" TEXT NOT NULL,

    CONSTRAINT "StockData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_name_key" ON "Stock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_ticker_key" ON "Stock"("ticker");

-- CreateIndex
CREATE INDEX "idx_date" ON "StockData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "StockData_stockId_date_key" ON "StockData"("stockId", "date");

-- AddForeignKey
ALTER TABLE "StockData" ADD CONSTRAINT "StockData_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
