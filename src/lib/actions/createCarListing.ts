"use server";
import { CarListingSchema, TCarListingSchema } from "../Types";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
export async function createCar(data: TCarListingSchema) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  const carListingData = {
    model: data.model,
    make: data.make,
    price: data.price,
    year: data.year,
    mileage: data.mileage,
    description: data.description,
    category: data.category,
    location: data.location,
    fuel: data.fuel,
    condition: data.condition,
    transmission: data.transmission,
    vin: data.vin,
    images: data.images,
  };
  const schemaValidation = CarListingSchema.safeParse(carListingData);

  if (!schemaValidation.success)
    return { error: "There is an error with creating the car list" };

  try {
    await db.carListing.create({
      data: {
        ...schemaValidation.data,
        listedById: userId,
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
    console.error("Error creating car listing", error);
    return { error: "Failed to create car listing. Please try again." };
  }
}
