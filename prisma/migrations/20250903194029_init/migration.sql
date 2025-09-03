/*
  Warnings:

  - You are about to drop the column `images` on the `CarListing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CarListing" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "public"."CarImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CarImage_carId_idx" ON "public"."CarImage"("carId");

-- AddForeignKey
ALTER TABLE "public"."CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."CarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
