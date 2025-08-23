"use client";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import ListingInputContainer from "../../../app/dashboard/_components/ListingInputContainer";
import MainContainer from "../../../components/MainContainer";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { getAllBanks, VerifyBank } from "../../../lib/actions/bankVerification";
import { createSeller } from "../../../lib/actions/createSeller";
import {
  BankDetails,
  PaystackBankResponse,
  SellerSchema,
  TSellerSchema,
} from "../../../lib/Types";
import BankDetailsModal from "./BankDetail";
export default function SellerForm() {
  const [banks, setBanks] = useState<PaystackBankResponse[]>([]);
  const [bankCode, setBankCode] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState("");
  const [openBankModal, setOpenBankModal] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const outsideRef = useOutsideClick(setOpenBankModal);
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSellerSchema>({ resolver: zodResolver(SellerSchema) });
  useEffect(() => {
    async function getBanks() {
      try {
        const data = await getAllBanks();
        setBanks(data.data || []);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    }
    getBanks();
  }, []);

  async function handleVerifyBank(): Promise<void> {
    if (accountNumber.length === 10 && bankCode) {
      const data = await VerifyBank({ accountNumber, bankCode });
      if (!data.status) {
        toast.error("Invalid Bank Details");
        return;
      }
      setBankDetails(data.data);
    } else {
      toast.error("Please provide valid account number and select a bank");
    }
  }

  async function handleFormSubmission(): Promise<void> {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const result = await createSeller(formData);
    if (result.success) {
      router.push("/dashboard");
      toast.success("Account Created");
    } else {
      toast.error(result?.error || "Something went wrong");
      throw new Error(result?.error || "Creation failed");
    }
  }
  return (
    <MainContainer>
      <section className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary border-border mx-auto h-fit w-full max-w-[850px] rounded-lg border p-6">
          <h1 className="text-lg font-bold">Become a Car Seller!</h1>
          <p className="text-subPrimary mt-3 text-sm">
            Unlock the potential of your vehicle. List it now and reach
            thousands of buyers!
          </p>
          <form
            className="flex w-full flex-col"
            onSubmit={handleSubmit(handleVerifyBank)}
            ref={formRef}
          >
            <ListingInputContainer>
              <Label className="text-sm font-semibold" htmlFor="businessName">
                Business Name
              </Label>
              <Input
                {...register("businessName", {
                  required: "Email is required",
                })}
                className="border-border border"
                id="businessName"
                type="text"
              />
              {errors.businessName?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.businessName.message}
                </span>
              )}
            </ListingInputContainer>
            <ListingInputContainer>
              <Label className="text-sm font-semibold" htmlFor="businessEmail">
                Business Email
              </Label>
              <Input
                {...register("businessEmail")}
                className="border-border border"
                id="businessEmail"
                type="text"
                defaultValue={user?.emailAddresses[0].emailAddress}
              />
              {errors.businessEmail?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.businessEmail.message}
                </span>
              )}
            </ListingInputContainer>
            <ListingInputContainer>
              <Label className="text-sm font-semibold" htmlFor="businessPhone">
                Business Phone Number
              </Label>
              <Input
                {...register("businessPhone")}
                className="border-border border"
                id="businessPhone"
              />
              {errors.businessPhone?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.businessPhone.message}
                </span>
              )}
            </ListingInputContainer>
            <ListingInputContainer>
              <Label className="text-sm font-semibold" htmlFor="accountNumber">
                Account Number
              </Label>
              <Input
                {...register("accountNumber")}
                className="border-border border"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              {errors.accountNumber?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.accountNumber.message}
                </span>
              )}
            </ListingInputContainer>
            <div
              className="relative mt-6 flex w-full flex-col gap-2"
              ref={outsideRef}
            >
              {openBankModal && (
                <div className="bg-main border-border absolute -top-[400%] z-50 h-[300px] w-full overflow-y-auto border">
                  <ul className="flex flex-col gap-2 px-2 py-2">
                    {filteredBanks.map((bank) => (
                      <li
                        key={bank.id}
                        onClick={() => {
                          setInputValue(bank.name);
                          setOpenBankModal(false);
                          setBankCode(bank.code);
                        }}
                        className="hover:bg-btnBg hover:text-secondary cursor-pointer rounded-lg px-3 py-2 text-sm font-medium"
                      >
                        {bank.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Label className="text-sm font-semibold" htmlFor="bankName">
                Select Bank
              </Label>
              <Input
                {...register("bankName", {
                  required: "BankName is required",
                })}
                className="border-border border"
                id="bankName"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setOpenBankModal(true)}
              />
              {errors.bankName?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.bankName.message}
                </span>
              )}
              <button type="button">
                {inputValue.length ? (
                  <FaXmark
                    className="text-subPrimary absolute top-[50%] right-[2%] cursor-pointer"
                    size={"20px"}
                    onClick={() => {
                      setInputValue("");
                      setOpenBankModal(false);
                    }}
                  />
                ) : (
                  <ChevronDown
                    className="text-subPrimary absolute top-[50%] right-[2%] cursor-pointer"
                    size={"20px"}
                    onClick={() => setOpenBankModal((close) => !close)}
                  />
                )}
              </button>
            </div>
            <BankDetailsModal
              onClick={handleFormSubmission}
              bankDetails={bankDetails}
            />
          </form>
        </div>
      </section>
    </MainContainer>
  );
}
