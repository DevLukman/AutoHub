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

  try {
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  } catch (error) {
    console.error("There was an error verfiy the user. Try again", error);
    return { error };
  }
}
