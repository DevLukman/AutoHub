// // app/api/user/route.ts
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   // Log request initiation
//   console.log("POST /api/user called");

//   try {
//     // Check authentication
//     const { userId } = await auth();
//     if (!userId) {
//       console.log("No userId found in auth");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     console.log("✓ Authenticated userId:", userId);

//     // Get Clerk user data
//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.log("❌ No user data or user.id found");
//       return NextResponse.json(
//         { error: "User data not found" },
//         { status: 400 },
//       );
//     }

//     const userData = {
//       id: user.id,
//       email: user.emailAddresses[0]?.emailAddress,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       imageUrl: user.imageUrl,
//     };
//     console.log("✓ Clerk user data:", userData);

//     // Test database connection
//     console.log("🔍 Testing database connection...");
//     await db.$connect();
//     console.log("✓ Database connected successfully");

//     // Check for existing user
//     console.log("🔍 Checking for existing user...");
//     const existingUser = await db.user.findUnique({
//       where: { clerkUserId: user.id },
//     });
//     console.log("Existing user result:", existingUser);

//     if (existingUser) {
//       console.log("✓ Found existing user, returning");
//       return NextResponse.json({ user: existingUser }, { status: 200 });
//     }

//     // Prepare user data for creation
//     const createData = {
//       clerkUserId: user.id,
//       email: user.emailAddresses[0]?.emailAddress ?? null,
//       name:
//         `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown",
//       imageUrl: user.imageUrl ?? null,
//     };
//     console.log("🔍 Data to create:", createData);

//     // Create new user
//     console.log("🔍 Creating new user...");
//     const newUser = await db.user.create({
//       data: createData,
//     });

//     console.log("✓ New user created successfully:", newUser);
//     return NextResponse.json({ user: newUser }, { status: 201 });
//   } catch (error) {
//     console.error("❌ ERROR in /api/user:");
//     console.error("Error type:", typeof error);
//     console.error("Error constructor:", error?.constructor?.name);
//     console.error("Error message:", error?.message);
//     console.error("Error code:", error?.code);
//     console.error("Error stack:", error?.stack);

//     // If it's a Prisma error, log additional details
//     if (error?.code) {
//       console.error("Prisma error code:", error.code);
//       console.error("Prisma error meta:", error.meta);
//     }

//     return NextResponse.json(
//       {
//         error: "Failed to save user",
//         details: error?.message || "Unknown error",
//         code: error?.code || "UNKNOWN",
//       },
//       { status: 500 },
//     );
//   }
// }
