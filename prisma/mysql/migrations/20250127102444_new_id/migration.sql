/*
  Warnings:

  - Made the column `portfolioId` on table `Stock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Stock` MODIFY `portfolioId` VARCHAR(191) NOT NULL;
