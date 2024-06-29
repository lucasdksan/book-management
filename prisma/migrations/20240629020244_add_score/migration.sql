/*
  Warnings:

  - You are about to drop the `waitlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `waitlist` DROP FOREIGN KEY `waitlist_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `waitlist` DROP FOREIGN KEY `waitlist_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `score` INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE `waitlist`;
