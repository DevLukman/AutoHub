"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPaperclip } from "@intentui/icons";
import { ChevronLeft, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { UpdateListing } from "../../../../lib/actions/updateListing";
import {
  CarListingSchema,
  GetCarProps,
  TCarListingSchema,
} from "../../../../lib/Types";

import { useUploadThing } from "../../../../utils/uploadthing";
import ListingInputContainer from "../../_components/ListingInputContainer";
import { NumberField } from "../../_components/NumberInput";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../../../../utils/Constants";

type UploadedFile = {
  url: string;
  key: string;
  name: string;
};

export default function UpdateListingForm({ updateData }: GetCarProps) {
  const router = useRouter();
  const results = updateData.data;
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success("Image upload successful");
    },
    onUploadError: (error) => {
      toast.error(`There was error with file upload: ${error.message}`);
    },
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TCarListingSchema>({
    resolver: zodResolver(CarListingSchema),
    defaultValues: {
      ...results,
      description: results?.description || "",
      images: results?.images,
    },
  });

  const descriptionValue = watch("description") || "";
  const imagesValue = watch("images") || [];

  async function handleFileSelect(files: File[]) {
    if (!files || files.length === 0) return;

    const currentImages = imagesValue;
    if (currentImages.length + files.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    // Validate file sizes and types
    const invalidFiles = files.filter(
      (file) =>
        file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      toast.error(
        "Some files are too large (max 5MB) or invalid format. Please use JPEG, PNG, or WebP.",
      );
      return;
    }

    try {
      const uploadImages = await startUpload(files);
      if (uploadImages) {
        const newImages = uploadImages.map((image) => ({
          url: image.ufsUrl,
          key: image.key,
          name: image.name,
        }));

        setValue("images", [...currentImages, ...newImages]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    }
  }

  function handleRemoveImage(index: number) {
    const currentImages = imagesValue;
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  }

  async function handleCarListing(data: TCarListingSchema) {
    try {
      const results = updateData.data;
      const id = results?.id as string;
      const updateResults = await UpdateListing({ id, data });
      if (updateResults.success) {
        toast.success("Car listing successfully updated");
        router.push("/dashboard/listings");
      } else {
        toast.error(updateResults.error);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update listing. Please try again.");
    }
  }

  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-4 pt-6 pb-8 sm:px-6">
      <Link
        href="/dashboard/listings"
        className="border-border hover:bg-main flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors"
      >
        <ChevronLeft size={11} className="text-subPrimary" />
        <span className="font-inter">Back</span>
      </Link>
      <div>
        <h1 className="mb-2 text-xl font-extrabold sm:text-2xl">
          Update Listing
        </h1>
        <p className="text-subPrimary text-xs sm:text-sm">
          Fill out the form below with accurate details about your vehicle to
          update the listing.
        </p>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit(handleCarListing)}>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <Label className="w-fit text-sm font-semibold" htmlFor="make">
                Make *
              </Label>
              <Input
                {...register("make")}
                placeholder="Toyota"
                className="border-border border"
                id="make"
              />
              {errors.make?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.make.message}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-semibold" htmlFor="model">
                Model *
              </Label>
              <Input
                {...register("model")}
                placeholder="Camry"
                className="border-border border"
                id="model"
              />
              {errors.model?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.model.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-2">
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <NumberField
                    label="Price *"
                    className="flex-1"
                    formatOptions={{
                      style: "currency",
                      currency: "NGN",
                      currencyDisplay: "narrowSymbol",
                    }}
                    step={100000}
                    placeholder="₦0.00"
                    minValue={0}
                    id="price"
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.price}
                  />
                )}
              />
              {errors.price?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Controller
                control={control}
                name="year"
                render={({ field }) => (
                  <NumberField
                    label="Year *"
                    className="flex-1"
                    placeholder={String(new Date().getFullYear())}
                    formatOptions={{
                      minimumIntegerDigits: 4,
                      useGrouping: false,
                    }}
                    minValue={1990}
                    maxValue={new Date().getFullYear() + 1}
                    id="year"
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.year}
                  />
                )}
              />
              {errors.year?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Controller
                control={control}
                name="mileage"
                render={({ field }) => (
                  <NumberField
                    label="Mileage *"
                    className="flex-1"
                    formatOptions={{
                      style: "unit",
                      unit: "kilometer",
                      unitDisplay: "narrow",
                    }}
                    id="mileage"
                    minValue={0}
                    placeholder="0 km"
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.mileage}
                  />
                )}
              />
              {errors.mileage?.message && (
                <span className="pl-1 text-sm text-red-500">
                  {errors.mileage.message}
                </span>
              )}
            </div>
          </div>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="condition">
              Condition *
            </Label>
            <Controller
              control={control}
              name="condition"
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                    id="condition"
                  >
                    <SelectValue placeholder="Select car condition" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="certified pre owned">
                        Certified Pre-owned
                      </SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.condition?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.condition.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="vin">
              VIN *
            </Label>
            <Input
              {...register("vin")}
              placeholder="Enter Vehicle Identification Number"
              className="border-border border"
              id="vin"
              maxLength={17}
            />
            {errors.vin?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.vin.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="location">
              Location *
            </Label>
            <Input
              {...register("location")}
              placeholder="e.g., Lagos, Nigeria"
              className="border-border border"
              id="location"
            />
            {errors.location?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.location.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="fuel">
              Fuel Type *
            </Label>
            <Controller
              control={control}
              name="fuel"
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                    id="fuel"
                  >
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.fuel?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.fuel.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="transmission">
              Transmission *
            </Label>
            <Controller
              control={control}
              name="transmission"
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                    id="transmission"
                  >
                    <SelectValue placeholder="Select transmission type" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.transmission?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.transmission.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="category">
              Car Category *
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                    id="category"
                  >
                    <SelectValue placeholder="Select car category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="crossover">Crossover</SelectItem>
                      <SelectItem value="wagon/hatchback">
                        Wagon/Hatchback
                      </SelectItem>
                      <SelectItem value="green car/hybrid">
                        Green Car/Hybrid
                      </SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                      <SelectItem value="sports car">Sports Car</SelectItem>
                      <SelectItem value="pickup truck">Pickup Truck</SelectItem>
                      <SelectItem value="luxury car">Luxury Car</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.category.message}
              </span>
            )}
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="description">
              Description (Optional)
            </Label>
            <Textarea
              {...register("description")}
              placeholder="Enter a detailed description of the vehicle"
              className="min-h-28 w-full"
              id="description"
              maxLength={500}
            />
            {errors.description?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
            <span className="text-subPrimary text-sm">
              {descriptionValue.length}/500
            </span>
          </ListingInputContainer>

          {/* For Images */}
          <div className="mt-6 flex w-full flex-col gap-2">
            <span className="text-sm font-semibold">
              {imagesValue.length}/6 images{" "}
              {imagesValue.length < 3 && (
                <span className="text-red-500">(minimum 3 required)</span>
              )}
            </span>
            <label htmlFor="imageUpload" className="cursor-pointer">
              <Button
                type="button"
                disabled={isUploading || imagesValue.length >= 6}
                className="border-border text-primary hover:bg-main flex w-fit cursor-pointer items-center gap-2 border bg-transparent p-5 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                asChild
              >
                <div>
                  {isUploading ? (
                    <>
                      <Loader2
                        className="text-subPrimary animate-spin"
                        size={16}
                      />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <IconPaperclip className="text-subPrimary rotate-45" />
                      <span>Browse Files</span>
                    </>
                  )}
                </div>
              </Button>
            </label>

            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileSelect(files);
                e.target.value = "";
              }}
              className="hidden"
              disabled={isUploading || imagesValue.length >= 6}
              aria-label="Upload vehicle images"
            />
            {errors.images?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.images.message}
              </span>
            )}
          </div>

          {/* Show the uploaded images */}
          {imagesValue.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {imagesValue.map((image: UploadedFile, index: number) => (
                <div key={image.key} className="group relative">
                  <div className="border-border relative aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={image.url}
                      alt={`Vehicle image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-1.5 text-white transition-opacity hover:bg-red-600"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || isUploading || imagesValue.length < 3}
            className="bg-btnBg text-secondary hover:bg-btnBg mt-6 w-full cursor-pointer rounded-lg py-4 text-sm font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Updating Listing...
              </>
            ) : (
              "Update Listing"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
