/*
  Warnings:

  - You are about to drop the column `images` on the `CarListing` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."CarListing_make_model_year_location_fuel_transmission_categ_idx";

-- DropIndex
DROP INDEX "public"."User_clerkUserId_idx";

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

-- CreateIndex
CREATE INDEX "CarListing_make_model_year_location_fuel_transmission_categ_idx" ON "public"."CarListing"("make", "model", "year", "location", "fuel", "transmission", "category", "status", "listedById");

-- CreateIndex
CREATE INDEX "Purchases_userId_idx" ON "public"."Purchases"("userId");

-- CreateIndex
CREATE INDEX "User_clerkUserId_email_name_idx" ON "public"."User"("clerkUserId", "email", "name");

-- AddForeignKey
ALTER TABLE "public"."CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."CarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
