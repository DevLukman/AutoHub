"use server";
import { CarListingSchema, TCarLisingSchema } from "../Types";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
export async function createCar(data: TCarLisingSchema) {
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
    images: data.images,
    fuel: data.fuel,
    condition: data.condition,
    transmission: data.transmission,
    vin: data.vin,
  };
  const schemaValidation = CarListingSchema.safeParse(carListingData);

  if (!schemaValidation.success)
    return { error: "There is an error with creating the car list" };

  try {
    await db.carListing.create({
      data: {
        ...schemaValidation.data,
        listedById: userId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating car listing", error);
    return { error: "Failed to create car listing. Please try again." };
  }
}
