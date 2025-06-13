/*
  Warnings:

  - The primary key for the `ShortUrl` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ShortUrl` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `shortUrlId` on the `ClickAnalytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ClickAnalytics" DROP CONSTRAINT "ClickAnalytics_shortUrlId_fkey";

-- AlterTable
ALTER TABLE "ClickAnalytics" DROP COLUMN "shortUrlId",
ADD COLUMN     "shortUrlId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShortUrl" DROP CONSTRAINT "ShortUrl_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ClickAnalytics" ADD CONSTRAINT "ClickAnalytics_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
