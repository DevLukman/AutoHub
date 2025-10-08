"use server";
import { db } from "../prisma";
import {
  CarListingSchema,
  GetCarToUpdateResponse,
  TCarListingSchema,
} from "../Types";
import { getUserSession } from "./getSession";

export async function GetCarToUpdate(
  id: string,
): Promise<GetCarToUpdateResponse> {
  const session = await getUserSession();
  if (!session) return { success: false, error: "Unauthorised" };

  try {
    const data = await db.carListing.findUnique({
      where: { id: id },
      include: { images: true },
    });

    if (!data) {
      return { success: false, error: "Car listing not found" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("There was error", error);
    const e = error as Error;
    return {
      success: false,
      error: e.message || "There was an error fetching the listing",
    };
  }
}

export async function UpdateListing({
  id,
  data,
}: {
  id: string;
  data: TCarListingSchema;
}) {
  const session = await getUserSession();
  if (!session) return { error: "Unauthorised" };
  const schemaValidation = CarListingSchema.safeParse(data);
  try {
    const updateData = await db.carListing.update({
      where: { id: id },
      data: {
        ...schemaValidation.data,
        status: "pending",
        images: {
          create: schemaValidation.data?.images.map((image) => ({
            url: image.url,
            key: image.key,
            name: image.name,
          })),
        },
      },
    });
    return { success: true, updateData };
  } catch (error) {
    console.error("Error updating car listing", error);
    return { error: "Failed to update car listing. Please try again." };
  }
}
