"use server";
import { db } from "../prisma";
import { CarListingSchema, TCarListingSchema } from "../Types";
import { getUserSession } from "./getSession";
export async function createCar(data: TCarListingSchema) {
  const session = await getUserSession();
  if (!session) return { error: "Unauthorized" };
  const schemaValidation = CarListingSchema.safeParse(data);
  if (!schemaValidation.success)
    return { error: "There is an error with creating the car listing" };

  try {
    await db.carListing.create({
      data: {
        ...schemaValidation.data,
        listedById: session.user.id,
        images: {
          create: schemaValidation.data.images.map((image) => ({
            url: image.url,
            key: image.key,
            name: image.name,
          })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    const e = error as Error;
    console.error("Error creating car listing", error);
    return {
      success: false,
      error: e.message || "Failed to create car listing. Please try again.",
    };
  }
}
