"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";

export async function Purchase() {
  const { userId } = await auth();
  if (!userId) {
    return {
      error: "You need to be logged in to add to wishlist",
      success: false,
      count: 0,
      spent: 0,
      orderStatus: 0,
      data: [],
    };
  }

  try {
    const [data, count, amountSpent, orderStatus] = await Promise.all([
      db.purchases.findMany({
        where: {
          userId: userId,
        },
        orderBy: { createdAt: "desc" },
      }),

      db.purchases.count({
        where: {
          userId: userId,
        },
      }),
      db.purchases.aggregate({
        where: {
          userId: userId,
        },
        _sum: {
          amount: true,
        },
      }),
      db.purchases.count({
        where: {
          userId: userId,
          status: "active",
        },
      }),
    ]);

    return {
      data,
      success: true,
      error: null,
      count,
      spent: amountSpent._sum.amount ?? 0,
      orderStatus,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error with wishlist",
      success: false,
      data: [],
      count: 0,
      spent: 0,
      orderStatus: 0,
    };
  }
}
