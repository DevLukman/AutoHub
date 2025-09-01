"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
export async function carListing() {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized access",
      data: [],
    };
  }
  try {
    const data = await db.carListing.findMany({
      where: { listedById: userId },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        status: true,
        createdAt: true,
        price: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data, success: true, error: null };
  } catch (error) {
    console.error("Failed to fetch car listings:", error);
    return {
      success: false,
      error: "Failed to load listings. Please try again.",
      data: [],
    };
  }
}

export async function listingStatus() {
  const { userId } = await auth();
  if (!userId)
    return {
      carListingCount: 0,
      activeCars: 0,
      soldCars: 0,
    };
  const carListingCount = await db.carListing.count({
    where: { listedById: userId },
  });
  const activeCars = await db.carListing.count({
    where: { listedById: userId, status: "active" },
  });
  const soldCars = await db.carListing.count({
    where: { listedById: userId, status: "sold" },
  });

  return { carListingCount, activeCars, soldCars };
}
