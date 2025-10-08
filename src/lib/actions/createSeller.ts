"use server";
import { db } from "../prisma";
import { SellerSchemaDB } from "../Types";
import { getUserSession } from "./getSession";

export async function createSeller(formData: FormData) {
  const session = await getUserSession();
  if (!session) return { error: "Unauthorized" };
  const existingSeller = await db.seller.findUnique({
    where: { sellerId: session.user.id },
  });

  if (existingSeller) return { error: "Seller profile already exists" };

  const sellerData = {
    businessName: formData.get("businessName"),
    businessEmail: formData.get("businessEmail"),
    businessPhone: formData.get("businessPhone"),
  };

  const schemaValidation = SellerSchemaDB.safeParse(sellerData);
  if (!schemaValidation.success) {
    return { error: "There is an error with creating seller" };
  }

  try {
    await db.seller.create({
      data: {
        ...schemaValidation.data,
        sellerId: session.user.id,
        isProfileComplete: true,
      },
    });
    return { success: true };
  } catch (error) {
    const e = error as Error;
    console.error("Error creating seller:");
    return {
      error: e.message || "Failed to create seller profile. Please try again.",
    };
  }
}

export async function sellerProfile() {
  const session = await getUserSession();
  if (!session?.user) return null;
  try {
    const seller = await db.seller.findUnique({
      where: { sellerId: session.user.id },
      select: { isProfileComplete: true },
    });
    return !!seller?.isProfileComplete;
  } catch (error) {
    console.error(error);
    throw new Error("there was an error with getting seller");
  }
}
