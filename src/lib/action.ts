"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });
  if (existingUser) return existingUser;

  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newUser;
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
