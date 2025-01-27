-- DropForeignKey
ALTER TABLE `Stock` DROP FOREIGN KEY `Stock_id_fkey`;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
