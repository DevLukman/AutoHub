"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
export async function carListing() {
  const { userId } = await auth();
  if (!userId) {
    console.error("Unauthorized access attempt");
    return [];
  }
  try {
    const data = await db.carListing.findMany({
      where: { listedById: userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch car listings:", error);
    return [];
  }
}
