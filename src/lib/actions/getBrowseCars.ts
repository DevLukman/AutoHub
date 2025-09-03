import { db } from "../prisma";

export async function carListings() {
  try {
    const data = await db.carListing.findMany({ include: { images: true } });
    const count = await db.carListing.count();
    return { success: true, data, count };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error with showing car listing",
      success: false,
      data: [],
    };
  }
}
