"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { BankDetails } from "../../../lib/Types";
import { useState } from "react";
type FormActionType = {
  bankDetails: BankDetails | null;
  onClick: () => Promise<void>;
};
export default function BankDetailsModal({
  bankDetails,
  onClick,
}: FormActionType) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function handleContinue(e: React.MouseEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await onClick();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <FormButton />
      {bankDetails && (
        <AlertDialogContent className="bg-main border-border rounded-lg border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Bank Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-subPrimary text-sm">
                Validate the account name and number matches the details you
                provided.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-1 pt-4">
            <div>
              <span className="text-subPrimary text-sm">Account Name:</span>
              <span className="text-primary font-inter ml-1 text-xs font-medium capitalize sm:text-sm md:text-base">
                {bankDetails?.account_name}
              </span>
            </div>
            <div>
              <span className="text-subPrimary text-sm">Account Number:</span>
              <span className="text-primary font-inter ml-1 text-xs font-medium sm:text-sm md:text-base">
                {bankDetails?.account_number}
              </span>
            </div>
          </div>
          <AlertDialogFooter className="flex w-full items-center justify-between pt-4">
            <AlertDialogCancel className="bg-main border-border hover:bg-main hover:text-primary w-full cursor-pointer border font-semibold md:w-fit">
              Cancel
            </AlertDialogCancel>
            <Button
              className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary w-full cursor-pointer font-semibold md:w-fit"
              type="button"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
function FormButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogTrigger asChild>
      <Button
        type="submit"
        disabled={pending}
        className="bg-btnBg text-secondary hover:bg-btnBg mt-8 cursor-pointer py-4 text-sm font-semibold"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Becoming a seller...
          </>
        ) : (
          "Become a seller"
        )}
      </Button>
    </AlertDialogTrigger>
  );
}

{
  /* <AlertDialogAction
  onSelect={(e) => {
    e.preventDefault(); // Prevent auto-close
    handleContinue();
  }}
  disabled={isLoading}
  className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary w-full cursor-pointer font-semibold md:w-fit"
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating Account...
    </>
  ) : (
    "Continue"
  )}
</AlertDialogAction> */
}
