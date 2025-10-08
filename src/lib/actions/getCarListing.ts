"use server";
import { PAGE_SIZE } from "@/utils/Constants";
import { db } from "../prisma";
import { getUserSession } from "./getSession";
export async function carListing(page: number = 1) {
  const session = await getUserSession();
  if (!session?.user.id) {
    return {
      success: false,
      error: "Unauthorized access",
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        count: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
  try {
    const finalPage = Math.max(1, Math.floor(Number(page)) || 1);
    const skip = (finalPage - 1) * PAGE_SIZE;
    const totalCount = await db.carListing.count({
      where: { listedById: session.user.id },
    });
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const data = await db.carListing.findMany({
      where: { listedById: session.user.id },
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
      skip: skip,
      take: PAGE_SIZE,
    });

    const count = await db.carListing.count({
      where: { listedById: session.user.id },
    });

    return {
      data,
      count,
      success: true,
      error: null,
      pagination: {
        currentPage: finalPage,
        totalPages,
        totalCount,
        hasNext: finalPage < totalPages,
        hasPrevious: finalPage > 1,
        PAGE_SIZE,
      },
    };
  } catch (error) {
    console.error("Failed to fetch car listings:", error);
    return {
      success: false,
      error:
        "OOps, something went wrong. But don't worry - it is not your fault. Try Again",
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        count: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

export async function listingStatus() {
  const session = await getUserSession();
  if (!session)
    return {
      carListingCount: 0,
      activeCars: 0,
      soldCars: 0,
    };
  const carListingCount = await db.carListing.count({
    where: { listedById: session.user.id },
  });
  const activeCars = await db.carListing.count({
    where: { listedById: session.user.id, status: "active" },
  });
  const soldCars = await db.carListing.count({
    where: { listedById: session.user.id, status: "sold" },
  });

  return { carListingCount, activeCars, soldCars };
}
