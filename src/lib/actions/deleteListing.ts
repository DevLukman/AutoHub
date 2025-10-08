"use server";
import { revalidatePath } from "next/cache";
import { db } from "../prisma";
import { getUserSession } from "./getSession";

export async function DeleteListing(id: string) {
  const session = await getUserSession();
  if (!session) return { error: "Unauthorized" };
  try {
    await db.carListing.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/listings");
    return { success: true };
  } catch (error) {
    const e = error as Error;
    console.error(error);
    return {
      success: false,
      message: e.message || "There is an error with deleting listing",
    };
  }
}
