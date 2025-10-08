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

export const SellerSchemaDB = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100),
  businessEmail: z.email().max(255),
  businessPhone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Phone number must be 10-11 digits"),
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
  condition: z.string("Condition is required"),
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

export const WishListSchema = z.object({
  make: z.string().trim(),
  model: z.string(),
  location: z.string(),
  price: z.number(),
  year: z.number(),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  fuel: z.string(),
  transmission: z.string(),
  image: z.string(),
  carListingId: z.string(),
});

export type TWishListSchema = z.infer<typeof WishListSchema>;

//For updating the listing
export type GetCarToUpdateResponse =
  | { success: true; data: CarListing; error?: never }
  | { success: false; error: string; data?: never };

export type GetCarProps = {
  updateData: GetCarToUpdateResponse;
};

//Auth types

//forgetpassword types
export const ForgetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address").max(50),
});
export type TForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;

//Login types
export const LoginSchema = z.object({
  email: z.email("Please enter a valid email").max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
  remember: z.boolean(),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

//Sign up types
export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.email("Invalid email format").max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
});

export type TSignUpSchema = z.infer<typeof SignupSchema>;
