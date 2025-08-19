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
