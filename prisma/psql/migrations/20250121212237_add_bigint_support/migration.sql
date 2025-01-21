/*
  Warnings:

  - You are about to alter the column `volume` on the `StockData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "StockData" ALTER COLUMN "volume" SET DATA TYPE BIGINT;
