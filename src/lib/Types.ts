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

export type BankDetails = {
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
