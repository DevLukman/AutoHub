"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { PAGE_SIZE } from "@/utils/Constants";
const PLATFORM_FEE_PERCENTAGE: number = 0.02;
export async function Orders(search: string = "", page: number = 1) {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized access",
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }

  try {
    const cleanSearch = search.trim();
    const finalPage = Math.max(1, Math.floor(page) || 1);
    const skip = (finalPage - 1) * PAGE_SIZE;

    const whereClause = {
      carListing: {
        listedById: userId,
        status: "sold" as const,
      },
      ...(cleanSearch && {
        OR: [
          {
            user: {
              name: { contains: cleanSearch, mode: "insensitive" as const },
            },
          },
          {
            user: {
              email: { contains: cleanSearch, mode: "insensitive" as const },
            },
          },
          {
            carListing: {
              model: { contains: cleanSearch, mode: "insensitive" as const },
            },
          },
          {
            carListing: {
              make: { contains: cleanSearch, mode: "insensitive" as const },
            },
          },
        ],
      }),
    };

    const [data, totalCount] = await Promise.all([
      db.order.findMany({
        where: whereClause,
        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          carListing: {
            select: {
              id: true,
              make: true,
              model: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: skip,
        take: PAGE_SIZE,
      }),
      db.order.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const dataValue = data.map((order) => {
      const platformFee = Number(
        (order.amount * PLATFORM_FEE_PERCENTAGE).toFixed(2),
      );
      const netAmount = Number((order.amount - platformFee).toFixed(2));
      return { ...order, platformFee, netAmount };
    });
    return {
      data: dataValue,
      success: true,
      error: null,
      pagination: {
        totalPages,
        currentPage: finalPage,
        totalCount,
        hasNext: finalPage < totalPages,
        hasPrevious: totalPages > 1,
      },
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      success: false,
      error: "Failed to load orders. Please try again.",
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

// When a car is purchased, update both the CarListing status and create Order
// async function processPurchase(carListingId: string, userId: string, amount: number) {
//   return await db.$transaction([
//     // Create the order
//     db.order.create({
//       data: {
//         userId,
//         carListingId,
//         amount,
//         status: "completed"
//       }
//     }),
//     // Update car listing status
//     db.carListing.update({
//       where: { id: carListingId },
//       data: { status: "sold" }
//     })
//   ]);
// }
