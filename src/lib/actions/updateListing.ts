"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { CarListingSchema, TCarListingSchema } from "../Types";
export async function GetCarToUpdate(id: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "unauthorised" };
  }
  try {
    const data = await db.carListing.findUnique({
      where: { id: id },
      include: { images: true },
    });
    return { success: true, data };
  } catch (error) {
    console.error("There was error", error);
    throw new Error("There was an error updating Listing");
  }
}

export async function UpdateListing({
  id,
  data,
}: {
  id: string;
  data: TCarListingSchema;
}) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "unauthorised" };
  }
  const carUpadteData = {
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
  const schemaValidation = CarListingSchema.safeParse(carUpadteData);
  try {
    const updateData = await db.carListing.update({
      where: { id: id },
      data: {
        ...schemaValidation.data,
        status: "pending",
        images: {},
      },
    });
    return { success: true, updateData };
  } catch (error) {
    console.error("Error creating car listing", error);
    return { error: "Failed to create car listing. Please try again." };
  }
}
