"use server";
import { revalidatePath } from "next/cache";
import { db } from "../prisma";
import { TWishListSchema, WishListSchema } from "../Types";
import { getUserSession } from "./getSession";

export async function getWishlist() {
  const session = await getUserSession();
  if (!session) return { error: "Unauthorised" };
  try {
    const data = await db.wishList.findMany({
      where: {
        user: { id: session.user.id },
      },
      orderBy: { createdAt: "desc" },
    });
    const count = await db.wishList.count({
      where: {
        user: { id: session.user.id },
      },
    });
    return { data, success: true, error: null, count };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error with wishlist",
      success: false,
      data: [],
      count: 0,
    };
  }
}

export async function createWishlist(wishData: TWishListSchema) {
  const session = await getUserSession();
  if (!session)
    return { error: "OOps, you have to be logged in to create wishlist" };
  const WishListSchemaValidation = WishListSchema.safeParse(wishData);

  if (!WishListSchemaValidation.success) {
    return { error: "There is an error with creating the car list" };
  }
  try {
    const data = db.wishList.create({
      data: {
        ...WishListSchemaValidation.data,
        userId: session.user.id,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error creating car listing", error);
    return { error: "Failed to create car listing. Please try again." };
  }
}

export async function deleteWishlist(id: string) {
  const session = await getUserSession();

  if (!session) return { error: "You have to be logged in" };
  try {
    const existingItem = await db.wishList.findFirst({
      where: {
        carListingId: id,
        userId: session.user.id,
      },
    });

    if (!existingItem) {
      return { error: "Wishlist item not found" };
    }

    await db.wishList.delete({
      where: {
        id: existingItem.id,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    const e = error as Error;
    console.error("Delete wishlist error:", error);
    return { error: e.message || "Failed to delete from wishlist" };
  }
}
