"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { SellerSchema } from "../Types";
export async function createSeller(formData: FormData) {
  const user = await currentUser();
  if (!user?.id) return { error: "Unauthorized" };
  const existingSeller = await db.seller.findUnique({
    where: { sellerId: user.id },
  });

  if (existingSeller) return { error: "Seller profile already exists" };

  const sellerData = {
    businessName: formData.get("businessName"),
    businessEmail: formData.get("businessEmail"),
    businessPhone: formData.get("businessPhone"),
    accountNumber: formData.get("accountNumber"),
    bankName: formData.get("bankName"),
  };

  const schemaValidation = SellerSchema.safeParse(sellerData);
  if (!schemaValidation.success) {
    return { error: "there is an error with creating seller" };
  }

  try {
    await db.seller.create({
      data: {
        ...schemaValidation.data,
        sellerId: user.id,
        isProfileComplete: true,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating seller:", {
      message: error,
      stack: error,
    });
    return { error: "Failed to create seller profile. Please try again." };
  }
}

export async function sellerProfile() {
  const user = await currentUser();
  if (!user) return null;

  try {
    const seller = await db.seller.findUnique({
      where: { sellerId: user.id },
      select: { isProfileComplete: true },
    });
    return !!seller?.isProfileComplete;
  } catch (error) {
    console.error(error);
    throw new Error("there was an error with getting seller");
  }
}
