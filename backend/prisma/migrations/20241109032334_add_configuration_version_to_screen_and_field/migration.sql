/*
  Warnings:

  - You are about to drop the column `partner_id` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `field_ids` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `screen_ids` on the `partnerconfig` table. All the data in the column will be lost.
  - Added the required column `configuration_version` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `configuration_version` to the `Screen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_partner_id_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "partner_id",
ADD COLUMN     "configuration_version" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "partnerId" TEXT;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "field_ids",
ADD COLUMN     "configuration_version" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "partnerconfig" DROP COLUMN "screen_ids";

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
