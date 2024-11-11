/*
  Warnings:

  - You are about to drop the column `partnerId` on the `Field` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_partnerId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "partnerId",
ADD COLUMN     "partner_id" TEXT;

-- AlterTable
ALTER TABLE "Screen" ADD COLUMN     "field_ids" JSONB;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
