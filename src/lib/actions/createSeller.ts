"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { z } from "zod";
const SellerSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100),
  businessEmail: z.email().max(255),
  accountNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Account number must be 10 digits"),
  businessPhone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Phone number must be 10-11 digits"),
  bankName: z.string().trim().min(1, "Bank name is required").max(100),
});
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

//  businessName: schemaValidation.data.businessName,
//     businessEmail: schemaValidation.data.businessEmail,
//     businessPhone: schemaValidation.data.businessPhone,
//     accountNumber: schemaValidation.data.accountNumber,
//     bankName: schemaValidation.data.bankName,
