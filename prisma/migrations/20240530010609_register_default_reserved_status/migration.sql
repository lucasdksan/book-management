-- AlterTable
ALTER TABLE `reservations` MODIFY `status` ENUM('RESERVED', 'RETURNED', 'LATE') NOT NULL DEFAULT 'RESERVED';
