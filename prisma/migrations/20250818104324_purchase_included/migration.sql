-- DropIndex
DROP INDEX "public"."Seller_sellerId_idx";

-- CreateTable
CREATE TABLE "public"."Purchases" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carPuchasedId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "model" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'completed',

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Purchases" ADD CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
