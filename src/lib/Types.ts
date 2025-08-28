import { z } from "zod";
export type PaystackBankResponse = {
  message: string;
  status: boolean;
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type accountInformation = {
  account_number: string;
  account_name: string;
};

export type Verify = {
  accountNumber: string;
  bankCode: string;
};

export const SellerSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100),
  businessEmail: z.email().max(255),
  accountNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Account number must be 10 digits"),
  businessPhone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Phone number must be 10-11 digits"),
  bankName: z.string().trim().min(1, "Bank name is required").max(100),
});

export type TSellerSchema = z.infer<typeof SellerSchema>;

export const CarListingSchema = z.object({
  make: z.string().trim().min(3, "make is required").max(20),
  model: z.string().trim().min(3, "model is required").max(20),
  price: z.number().min(1, "Price must be greater than 0"),
  year: z
    .number()
    .int()
    .min(2010, "Year must be 2010 or later")
    .max(new Date().getFullYear() + 10, "Invalid year"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  condition: z.enum(["new", "used", "certified pre owned", "damaged"], {
    message: "Select a condition",
  }),
  location: z.string().trim().min(3, "Location is required"),
  fuel: z.enum(["petrol", "diesel", "hybrid", "electric"], {
    message: "Slease select a fuel type",
  }),
  transmission: z.enum(["automatic", "manual"], {
    message: "Please select a transmission type",
  }),
  category: z.enum(
    [
      "sedan",
      "coupe",
      "suv",
      "crossover",
      "wagon/hatchback",
      "green car/hybrid",
      "convertible",
      "sports car",
      "pickup truck",
      "luxury car",
    ],
    {
      message: "Select a category",
    },
  ),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  vin: z.string().min(17, "vin is required"),
  images: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
        name: z.string(),
      }),
    )
    .min(3, "Minimum 3 images required")
    .max(6, "Maximum 6 images allowed"),
});
export type TCarLisingSchema = z.infer<typeof CarListingSchema>;
