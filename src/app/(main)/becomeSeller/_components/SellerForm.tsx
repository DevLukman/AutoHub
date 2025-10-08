"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import {
  getAllBanks,
  VerifyBank,
} from "../../../../lib/actions/bankVerification";
import { createSeller } from "../../../../lib/actions/createSeller";
import {
  accountInformation,
  PaystackBankResponse,
  SellerSchema,
  TSellerSchema,
} from "../../../../lib/Types";
import ListingInputContainer from "../../../dashboard/_components/ListingInputContainer";
import BankDetailsModal from "./BankDetail";

export default function SellerForm({ email }: { email: string }) {
  const [bankCode, setBankCode] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<accountInformation | null>(
    null,
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState("");
  const [openBankModal, setOpenBankModal] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const outsideRef = useOutsideClick(setOpenBankModal);
  const {
    data: banks = [],
    error: banksError,
    isLoading,
  } = useSWR<PaystackBankResponse[]>(
    "banks",
    async () => {
      const data = await getAllBanks();
      return data.data || [];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TSellerSchema>({
    resolver: zodResolver(SellerSchema),
    defaultValues: {
      businessEmail: email || "",
    },
  });

  // Handle banks fetch error
  if (banksError) {
    console.error("Error fetching banks:", banksError);
  }

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
      toast.error(result.error || "Something went wrong");
      throw new Error(result.error || "Creation failed");
    }
  }

  return (
    <>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                className="border-border border"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setAccountNumber(value);
                  setValue("accountNumber", value);
                }}
                maxLength={10}
                placeholder="Enter 10-digit account number"
                disabled={isSubmitting}
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
                <div
                  className="bg-main border-border absolute bottom-full left-0 z-50 mb-2 max-h-[300px] w-full overflow-y-auto rounded-lg border shadow-lg"
                  role="listbox"
                  aria-label="Select bank"
                >
                  {isLoading ? (
                    <div
                      className="flex items-center justify-center py-4"
                      role="status"
                      aria-label="Loading banks"
                    >
                      <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : filteredBanks.length > 0 ? (
                    <ul className="flex flex-col gap-1 p-2">
                      {filteredBanks.map((bank) => (
                        <li
                          key={bank.id}
                          onClick={() => {
                            setInputValue(bank.name);
                            setOpenBankModal(false);
                            setBankCode(bank.code);
                            setValue("bankName", bank.name);
                            setBankDetails(null);
                          }}
                          className="hover:bg-btnBg hover:text-secondary cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                          role="option"
                          aria-selected={inputValue === bank.name}
                        >
                          {bank.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-3 text-center text-sm text-gray-500">
                      No banks found
                    </p>
                  )}
                </div>
              )}
              <Label className="text-sm font-semibold" htmlFor="bankName">
                Select Bank
              </Label>
              <div className="relative">
                <Input
                  className="border-border border pr-10"
                  id="bankName"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setOpenBankModal(true)}
                  placeholder="Search for your bank"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
                {errors.bankName?.message && (
                  <span className="pl-1 text-sm text-red-500">
                    {errors.bankName.message}
                  </span>
                )}
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  aria-label={
                    inputValue.length ? "Clear selection" : "Open dropdown"
                  }
                >
                  {inputValue.length ? (
                    <FaXmark
                      className="text-subPrimary cursor-pointer transition-colors hover:text-red-500"
                      size={20}
                      onClick={() => {
                        setInputValue("");
                        setBankCode("");
                        setOpenBankModal(false);
                        setBankDetails(null);
                        setValue("bankName", "");
                      }}
                    />
                  ) : (
                    <ChevronDown
                      className="text-subPrimary cursor-pointer transition-colors hover:text-gray-700"
                      size={20}
                      onClick={() => setOpenBankModal((prev) => !prev)}
                    />
                  )}
                </button>
              </div>
            </div>

            <BankDetailsModal
              onClick={handleFormSubmission}
              bankDetails={bankDetails}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </section>
    </>
  );
}
