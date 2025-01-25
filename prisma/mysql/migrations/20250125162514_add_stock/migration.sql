-- CreateTable
CREATE TABLE `Portfolio` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `totalInvestment` DOUBLE NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `ticker` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NULL DEFAULT 0.01,
    `purchasePrice` DOUBLE NULL,
    `currentPrice` DOUBLE NOT NULL,
    `totalValue` DOUBLE NULL DEFAULT 0,
    `purchaseDate` DATETIME(3) NULL,
    `lastUpdated` DATETIME(3) NULL,
    `portfolioId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Stock_name_key`(`name`),
    UNIQUE INDEX `Stock_ticker_key`(`ticker`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_id_fkey` FOREIGN KEY (`id`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
