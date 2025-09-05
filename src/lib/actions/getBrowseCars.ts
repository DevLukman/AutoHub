import { buildCarFilters } from "@/utils/helper";
import { db } from "../prisma";
import { SearchAndFilterProps } from "../Types";
const CARS_SIZE = 12;
export async function carListings(
  searchParams: SearchAndFilterProps,
  page: number = 1,
) {
  try {
    const finalPage = Math.max(1, Math.floor(page) || 1);
    const skip = (finalPage - 1) * CARS_SIZE;
    const totalCount = await db.carListing.count();
    const totalPages = Math.ceil(totalCount / CARS_SIZE);
    const filters = buildCarFilters(searchParams);
    const data = await db.carListing.findMany({
      where: filters,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: CARS_SIZE,
    });

    return {
      success: true,
      data,
      pagination: {
        currentPage: finalPage,
        totalCount,
        totalPages,
        hasPrevious: finalPage > 1,
        hasNext: finalPage < totalPages,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error with showing car listing",
      success: false,
      data: [],
      pagination: {
        currentPage: 0,
        totalCount: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
      },
    };
  }
}

export function getCarsCount(searchParams: SearchAndFilterProps) {
  try {
    const filters = buildCarFilters(searchParams);
    const count = db.carListing.count({
      where: filters,
    });
    return count;
  } catch (error) {
    console.error("Error fetching car count:", error);
    throw new Error("Failed to fetch car count");
  }
}
