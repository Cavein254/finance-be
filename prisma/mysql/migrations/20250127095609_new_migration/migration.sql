/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Stock_name_key` ON `Stock`;

-- CreateIndex
CREATE UNIQUE INDEX `Portfolio_name_key` ON `Portfolio`(`name`);
