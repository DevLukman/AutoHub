"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
const PLATFORM_FEE_PERCENTAGE: number = 0.02;
export async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      error: "Unauthorized access",
      data: [],
    };
  }

  try {
    const data = await db.order.findMany({
      where: {
        carListing: {
          listedById: userId,
          status: "sold",
        },
      },
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
            make: true,
            model: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const dataValue = data.map((order) => {
      const platformFee = Number(
        (order.amount * PLATFORM_FEE_PERCENTAGE).toFixed(2),
      );
      const netAmount = Number((order.amount - platformFee).toFixed(2));
      return { ...order, platformFee, netAmount };
    });
    return { data: dataValue, success: true, error: null };
  } catch (error) {
    console.error("Failed to fetch car listings:", error);
    return {
      success: false,
      error: "Failed to load listings. Please try again.",
      data: [],
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
