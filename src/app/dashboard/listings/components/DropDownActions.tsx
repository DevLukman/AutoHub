"use client";
import { Button } from "../../../../components/ui/button";
import { DeleteListing } from "../../../../lib/actions/deleteListing";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
export default function DropDownActions({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <button>
          <span className="sr-only">Open menu</span>
          <RxDotsVertical className="cursor-pointer" size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="bg-main">
        <DropdownMenuItem className="focus:bg-btnBg focus:text-main text-primary">
          <Link
            href={`/dashboard/updateListing/${id}`}
            className="flex items-center gap-2"
          >
            <FiEdit />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:bg-red-500 focus:text-white">
          <DeleteDialog id={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteDialog({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  async function handleDelete(): Promise<void> {
    try {
      setIsLoading(true);
      const result = await DeleteListing(id);
      if (result.success) {
        toast.success("Listing deleted");
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to delete listing");
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error with deleting this listing");
    } finally {
      setIsLoading(false);
    }
  }

  function handleOPenChange(openStatus: boolean) {
    if (isLoading && !openStatus) {
      return;
    }
    setOpen(openStatus);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOPenChange}>
      <AlertDialogTrigger asChild>
        <button
          className="flex cursor-pointer items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <span>
            <MdDelete />
          </span>
          <span>Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-main border-border border">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this listing? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => setOpen(false)}
            className="hover:bg-secondary hover:text-primary cursor-pointer bg-transparent"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="text-primary cursor-pointer bg-red-500 hover:bg-red-950 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
