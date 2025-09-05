// import { CarListing } from "@/generated/prisma";
import { z } from "zod";

export type CarListing = {
  id: string;
  listedById: string;
  createdAt: Date;
  updatedAt: Date;
  make: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  condition: string;
  location: string;
  fuel: string;
  transmission: string;
  category: string;
  description: string | null;
  status: string;
  vin: string;
  images: {
    id: string;
    createdAt: Date;
    name: string;
    url: string;
    key: string;
    carId: string;
  }[];
} | null;
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
  condition: z.string(),
  location: z.string().trim().min(3, "Location is required"),
  fuel: z.string(),
  transmission: z.string(),

  category: z.string(),
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
export type TCarListingSchema = z.infer<typeof CarListingSchema>;

type GetCar =
  | { success: boolean; data: CarListing | null; error?: null }
  | { success?: null; error: string; data?: null };

export type GetCarProps = {
  updateData: GetCar;
};

export type SearchAndFilterProps = {
  brand: string;
  model: string;
  year: string;
  condition: string;
  category: string;
  transmission: string;
  fuel: string;
  page: string;
};
