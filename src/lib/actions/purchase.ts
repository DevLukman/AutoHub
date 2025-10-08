"use server";
import { db } from "../prisma";
import { getUserSession } from "./getSession";

export async function Purchase() {
  const session = await getUserSession();
  if (!session) {
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
          userId: session.user.id,
        },
        orderBy: { createdAt: "desc" },
      }),

      db.purchases.count({
        where: {
          userId: session.user.id,
        },
      }),
      db.purchases.aggregate({
        where: {
          userId: session.user.id,
        },
        _sum: {
          amount: true,
        },
      }),
      db.purchases.count({
        where: {
          userId: session.user.id,
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
    const e = error as Error;
    console.error(error);
    return {
      error: e.message || "There was an error with making purchase",
      success: false,
      data: [],
      count: 0,
      spent: 0,
      orderStatus: 0,
    };
  }
}
