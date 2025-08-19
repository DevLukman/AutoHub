-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seller" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "businessPhoneNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CarListing" (
    "id" TEXT NOT NULL,
    "listedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "CarListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WishList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carListingId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "fuel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carListingId" TEXT NOT NULL,
    "transactionId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "public"."User"("clerkUserId");

-- CreateIndex
CREATE INDEX "User_clerkUserId_idx" ON "public"."User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_sellerId_key" ON "public"."Seller"("sellerId");

-- CreateIndex
CREATE INDEX "Seller_sellerId_idx" ON "public"."Seller"("sellerId");

-- CreateIndex
CREATE INDEX "CarListing_make_model_year_location_fuel_transmission_categ_idx" ON "public"."CarListing"("make", "model", "year", "location", "fuel", "transmission", "category", "status");

-- CreateIndex
CREATE INDEX "WishList_userId_carListingId_idx" ON "public"."WishList"("userId", "carListingId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_carListingId_key" ON "public"."Order"("carListingId");

-- CreateIndex
CREATE INDEX "Order_userId_carListingId_status_idx" ON "public"."Order"("userId", "carListingId", "status");

-- AddForeignKey
ALTER TABLE "public"."CarListing" ADD CONSTRAINT "CarListing_listedById_fkey" FOREIGN KEY ("listedById") REFERENCES "public"."Seller"("sellerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WishList" ADD CONSTRAINT "WishList_carListingId_fkey" FOREIGN KEY ("carListingId") REFERENCES "public"."CarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_carListingId_fkey" FOREIGN KEY ("carListingId") REFERENCES "public"."CarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
