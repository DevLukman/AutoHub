/*
  Warnings:

  - Added the required column `vin` to the `CarListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CarListing" ADD COLUMN     "vin" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT;
