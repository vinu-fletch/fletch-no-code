/*
  Warnings:

  - You are about to drop the column `screen_ids` on the `Screen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "screen_ids";

-- AlterTable
ALTER TABLE "partnerconfig" ADD COLUMN     "screen_ids" JSONB;
