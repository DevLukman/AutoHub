import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";

export async function getWishlist() {
  const { userId } = await auth();
  if (!userId) {
    return {
      error: "You have to be logged view this page",
      data: [],
    };
  }

  try {
    const data = await db.wishList.findMany({
      where: {
        user: { clerkUserId: userId },
      },
      include: { carListing: { include: { images: true } } },
    });
    const count = await db.wishList.count({});
    return { data, success: true, error: null, count };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error with wishlist",
      success: false,
      data: [],
    };
  }
}
