"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";

export async function DeleteListing(id: string) {
  const { userId } = await auth();
  if (!userId) return { error: "unauthorised" };
  try {
    await db.carListing.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/listings");
    return { success: true };
  } catch (error) {
    console.error("There was error", error);
    throw new Error("There was an error deleting listing");
  }
}
