"use server";

import { db } from "../prisma";
import { auth } from "@clerk/nextjs/server";
export async function getCarStatus() {
  const { userId } = await auth();
  if (!userId)
    return {
      success: false,
      error: "Unauthorized access",
      totalRevenue: 0,
      totalOrders: 0,
      carListedCount: 0,
      activeCars: 0,
    };

  try {
    const [orderStats, carListed, totalSold, activeCars] = await Promise.all([
      db.order.aggregate({
        where: {
          carListing: { listedById: userId, status: "sold" },
          status: "completed",
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),
      db.carListing.count({
        where: { listedById: userId },
      }),
      db.carListing.count({
        where: { listedById: userId, status: "active" },
      }),
      db.carListing.count({
        where: { listedById: userId, status: "sold" },
      }),
    ]);
    return {
      success: true,
      totalRevenue: orderStats._sum.amount || 0,
      totalOrders: orderStats._count.id || 0,
      carListed,
      totalSold,
      activeCars,
    };
  } catch (error) {
    console.error("Failed to fetch car status:", error);
    return {
      success: false,
      carListed: 0,
      activeCars: 0,
      totalRevenue: 0,
      totalOrders: 0,
      error: "Failed to load car status",
    };
  }
}
