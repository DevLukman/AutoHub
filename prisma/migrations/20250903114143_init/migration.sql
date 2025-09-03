/*
  Warnings:

  - You are about to drop the `CarImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `CarListing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CarImage" DROP CONSTRAINT "CarImage_carId_fkey";

-- AlterTable
ALTER TABLE "public"."CarListing" ADD COLUMN     "images" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."CarImage";
