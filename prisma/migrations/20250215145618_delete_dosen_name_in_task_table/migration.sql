/*
  Warnings:

  - You are about to drop the column `matkul` on the `Task` table. All the data in the column will be lost.
  - Added the required column `dosenId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_matkul_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `matkul`,
    ADD COLUMN `dosenId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
