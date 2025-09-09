"use server";

// When a car is purchased, update both the CarListing status and create Order
// async function processPurchase(carListingId: string, userId: string, amount: number) {
//   return await db.$transaction([
//     // Create the order
//     db.order.create({
//       data: {
//         userId,
//         carListingId,
//         amount,
//         status: "completed"
//       }
//     }),
//     // Update car listing status
//     db.carListing.update({
//       where: { id: carListingId },
//       data: { status: "sold" }
//     })
//   ]);
// }
