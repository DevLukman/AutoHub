"use server";
import { Verify } from "../Types";

export async function getAllBanks() {
  try {
    const res = await fetch("https://api.paystack.co/bank?country=nigeria", {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function VerifyBank({ accountNumber, bankCode }: Verify) {
  try {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
