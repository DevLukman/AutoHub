/*
  Warnings:

  - You are about to drop the column `accountName` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `businessPhoneNumber` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `images` to the `CarListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessPhone` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CarListing" DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL,
ALTER COLUMN "vin" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Seller" DROP COLUMN "accountName",
DROP COLUMN "businessPhoneNumber",
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "businessPhone" TEXT NOT NULL;
