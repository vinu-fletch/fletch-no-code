/*
  Warnings:

  - You are about to drop the column `isActive` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Screen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
