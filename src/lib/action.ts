"use server";
import { Verify } from "./Types";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

//Creating user
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

export async function getAllBanks() {
  try {
    const res = await fetch("https://api.paystack.co/bank?country=nigeria", {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function VerifyBank({ accountNumber, bankCode }: Verify) {
  try {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function checkUserProfileComplete() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.seller.findUnique({
    where: { sellerId: user.id },
    select: { isProfileComplete: true },
  });

  return dbUser?.isProfileComplete || false;
}
