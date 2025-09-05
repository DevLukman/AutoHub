"use client";
import { createCar } from "../../../../lib/actions/createCarListing";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPaperclip } from "@intentui/icons";
import { ChevronLeft, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NumberField } from "../../../../app/dashboard/_components/NumberInput";
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
import { CarListingSchema, TCarListingSchema } from "../../../../lib/Types";
import { useUploadThing } from "../../../../utils/uploadthing";
import ListingInputContainer from "../../_components/ListingInputContainer";
type UploadedFile = {
  url: string;
  key: string;
  name: string;
};
export default function CreatingListingForm() {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success("Image upload sucessful");
    },
    onUploadError: (error) => {
      toast.error(
        `There was error with file upload: ${error.message || error}`,
      );
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
      year: new Date().getFullYear(),
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

  function handleRemoveimage(index: number) {
    const currentImages = imagesValue;
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  }

  async function handleCarListing(data: TCarListingSchema) {
    console.log(data);
    const results = await createCar(data);
    if (results.success) {
      toast.success("Car listing successfully created");
      redirect("/dashboard");
    } else {
      toast.error(results.error);
    }
  }
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-6 pt-6 pb-8">
      <Link
        href="/dashboard"
        className="border-border flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-xs"
      >
        <span>
          <ChevronLeft size={"11px"} className="text-subPrimary" />
        </span>
        <span className="font-inter text-white">Back</span>
      </Link>
      <div>
        <h1 className="mb-2 text-2xl font-extrabold">Create New Listing</h1>
        <p className="text-subPrimary text-sm">
          Fill out the form below with accurate details about your vechicle to
          create a new listing.
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
                placeholder="Lexus"
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
                placeholder="Lexus"
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
                    step={1000000}
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
                    minValue={2010}
                    maxValue={new Date().getFullYear() + 10}
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
              Condition
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
              placeholder="Enter Vehicle Location"
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
          <div className="mt-6 flex w-fit flex-col gap-2">
            <span className="text-sm font-semibold">
              {imagesValue.length}/6 images{" "}
              {imagesValue.length < 3 && "(minimum 3 required)"}
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
                      <Upload
                        className="text-subPrimary animate-spin"
                        size={16}
                      />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <IconPaperclip className="text-subPrimary rotate-45" />
                      <span>Browse Files...</span>
                    </>
                  )}
                </div>
              </Button>
            </label>
            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileSelect(files);
                e.target.value = "";
              }}
              className="hidden"
              disabled={isUploading || imagesValue.length >= 6}
            />
            {errors.images?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.images.message}
              </span>
            )}
          </div>
          {/* show the uploaded images */}
          {imagesValue.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
              {imagesValue.map((image: UploadedFile, index: number) => (
                <div key={index} className="group relative">
                  <div className="border-border relative aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveimage(index)}
                      className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="bg-btnBg text-secondary hover:bg-btnBg mt-6 w-full cursor-pointer rounded-lg py-4 text-sm font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Creating Listing
              </>
            ) : (
              "Create Listing"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
