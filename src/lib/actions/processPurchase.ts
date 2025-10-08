"use server";
import { db } from "../prisma";
import { getUserSession } from "./getSession";
export async function processPurchase(
  carListingId: string,
  amount: number,
  make: string,
  model: string,
) {
  const session = await getUserSession();
  if (!session) return { error: "unauthorised", success: false };

  try {
    await db.$transaction([
      db.order.create({
        data: {
          userId: session.user.id,
          carListingId: carListingId,
          transactionId: carListingId,
          amount: amount,
        },
      }),

      //Update car listing
      db.carListing.update({
        where: { id: carListingId },
        data: { status: "sold" },
      }),

      //create purchase
      db.purchases.create({
        data: {
          userId: session.user.id,
          amount: amount,
          make: make,
          model: model,
          carPuchasedId: carListingId,
        },
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error(error);
    const e = error as Error;
    return {
      success: false,
      error: e.message || "there was an error process transations try again.",
    };
  }
}
