"use client";
import { verifyPayment } from "../../../../lib/actions/verify-payment";
import { processPurchase } from "../../../../lib/actions/processPurchase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface PaymentHandlerProps {
  carListingId: string;
  amount: number;
  make: string;
  model: string;
  reference: string;
  onComplete: () => void;
}

export function PaymentHandler({
  carListingId,
  amount,
  make,
  model,
  reference,
  onComplete,
}: PaymentHandlerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePaymentSuccess = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    console.log("Processing payment success for reference:", reference);

    try {
      // Step 1: Verify payment with Paystack
      console.log("Verifying payment...");
      const verification = await verifyPayment(reference);
      console.log("Verification result:", verification);

      if (!verification.success) {
        toast.error("Payment verification failed");
        setIsProcessing(false);
        return;
      }

      console.log("Processing purchase in database...");
      const purchase = await processPurchase(
        carListingId,
        amount,
        make,
        model,
        reference,
      );

      console.log("Purchase result:", purchase);

      if (purchase.success) {
        toast.success("Purchase successful! Your order is on its way");
        router.push("/purchases");
      } else {
        toast.error(purchase.error || "Failed to process purchase");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred while processing your payment");
    } finally {
      setIsProcessing(false);
      onComplete();
    }
  };

  // Auto-trigger when component mounts with a reference
  useState(() => {
    if (reference) {
      handlePaymentSuccess();
    }
  });

  return (
    <div className="p-4 text-center">
      {isProcessing ? (
        <div>Processing your payment...</div>
      ) : (
        <div>Payment completed!</div>
      )}
    </div>
  );
}
