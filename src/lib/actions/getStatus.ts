"use server";
import { db } from "../prisma";
import { getUserSession } from "./getSession";
export async function getCarStatus() {
  const session = await getUserSession();
  if (!session)
    return {
      success: false,
      error: "Unauthorized access",
      totalRevenue: 0,
      totalOrders: 0,
      carListedCount: 0,
      activeCars: 0,
    };
  try {
    const [orderStats, carListed, activeCars] = await Promise.all([
      db.order.aggregate({
        where: {
          carListing: { listedById: session.user.id, status: "sold" },
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),
      db.carListing.count({
        where: { listedById: session.user.id },
      }),
      db.carListing.count({
        where: { listedById: session.user.id, status: "active" },
      }),
    ]);
    return {
      success: true,
      totalRevenue: orderStats._sum.amount || 0,
      totalOrders: orderStats._count.id || 0,
      carListed,
      activeCars,
    };
  } catch (error) {
    console.error("Failed to fetch car status:", error);
    const e = error as Error;
    return {
      success: false,
      carListed: 0,
      activeCars: 0,
      totalRevenue: 0,
      totalOrders: 0,
      error: e.message || "Failed to load car status",
    };
  }
}
