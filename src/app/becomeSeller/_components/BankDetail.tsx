"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BankDetails } from "@/lib/Types";
import { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";
type FormActionType = {
  bankDetails: BankDetails | null;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};
export default function BankDetailsModal({
  bankDetails,
  onClick,
}: FormActionType) {
  return (
    <AlertDialog>
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
            <AlertDialogAction
              asChild
              className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary w-full cursor-pointer font-semibold md:w-fit"
            >
              <Button type="button" onClick={onClick}>
                Continue
              </Button>
            </AlertDialogAction>
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
        {pending ? "becoming a seller" : "Become a seller"}
      </Button>
    </AlertDialogTrigger>
  );
}
