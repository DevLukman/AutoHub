"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconPaperclip } from "@intentui/icons";
import { ChevronLeft } from "lucide-react";
import Form from "next/form";
import Link from "next/link";

import { NumberField } from "@/app/dashboard/_components/NumberInput";
import { useState } from "react";
import ListingInputContainer from "../_components/ListingInputContainer";

export default function NewListing() {
  const [count, setCount] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // function handleClient(formData: FormData) {
  //   const model = formData.get("model");
  //   const make = formData.get("make");
  //   const price = formData.get("price");
  //   const year = formData.get("year");
  //   const mileage = formData.get("mileage");
  //   const condition = formData.get("condition");
  //   const vin = formData.get("vin");
  //   const location = formData.get("location");
  //   const fuel = formData.get("fuel");
  //   const transmission = formData.get("transmission");
  //   const description = formData.get("description");
  // }
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
        <Form action={"/"}>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <Label className="w-fit text-sm font-semibold" htmlFor="make">
                Make
              </Label>
              <Input
                placeholder="Lexus"
                className="border-border border"
                id="make"
                name="make"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-semibold" htmlFor="model">
                Model
              </Label>
              <Input
                placeholder="Lexus"
                className="border-border border"
                id="model"
                name="model"
              />
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
            <NumberField
              className="flex-1"
              label="Price"
              formatOptions={{
                style: "currency",
                currency: "NGN",
                currencyDisplay: "narrowSymbol",
              }}
              step={1000000}
              placeholder="₦0.00"
              minValue={0}
              name="price"
            />
            <NumberField
              className="flex-1"
              label="Year"
              placeholder={String(new Date().getFullYear())}
              formatOptions={{
                minimumIntegerDigits: 4,
                useGrouping: false,
              }}
              minValue={2010}
              name="year"
            />
            <NumberField
              className="flex-1"
              label="Mileage"
              formatOptions={{
                style: "unit",
                unit: "kilometer",
                unitDisplay: "narrow",
              }}
              minValue={0}
              placeholder="0 km"
              name="mileage"
            />
          </div>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="condition">
              Condition
            </Label>
            <Select name="condition">
              <SelectTrigger
                className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                size="default"
                id="condition"
              >
                <SelectValue placeholder="Select car condition" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="certified pre owned">
                    Certified pre owned
                  </SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="vin">
              VIN (Optional)
            </Label>
            <Input
              placeholder="Enter Vehicle Identification Number"
              className="border-border border"
              id="vin"
              name="vin"
            />
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="location">
              Location
            </Label>
            <Input
              placeholder="Enter Vehicle Location"
              className="border-border border"
              id="location"
              name="location"
            />
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="fuel">
              Fuel Type
            </Label>
            <Select name="fuel">
              <SelectTrigger
                className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                size="default"
                id="fuel"
              >
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hyrid">Hybrid</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="Transmission">
              Transmission
            </Label>
            <Select name="transmission">
              <SelectTrigger
                className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                size="default"
                id="Transmission"
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
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="category">
              Car Category
            </Label>
            <Select name="category">
              <SelectTrigger
                className="focus:ring-btnBg w-full focus:ring-[2px] focus-visible:ring-[#142302]"
                size="default"
                id="category"
              >
                <SelectValue placeholder="Select car category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="suv">Suv</SelectItem>
                  <SelectItem value="crossover">Crossover</SelectItem>
                  <SelectItem value="wagon/hatchback">Wagon</SelectItem>
                  <SelectItem value="green car/hybrid">
                    Green car hybrid
                  </SelectItem>
                  <SelectItem value="convertiable">Convertiable</SelectItem>
                  <SelectItem value="sports car">Sports car</SelectItem>
                  <SelectItem value="pickup truck">Pickup truck</SelectItem>
                  <SelectItem value="Luxury car">Luxury car</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ListingInputContainer>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="description">
              Description (Optional)
            </Label>
            <Textarea
              placeholder="Enter a detailed description of the vehicle"
              className="min-h-28 w-full"
              id="description"
              name="description"
              minLength={0}
              maxLength={500}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <span className="text-subPrimary mt-1 text-sm">
              {count.length}/500
            </span>
          </ListingInputContainer>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-sm font-semibold">0/6 images</span>
            <Button
              type="button"
              className="border-border text-primary hover:bg-main flex w-fit cursor-pointer items-center gap-2 border bg-transparent p-5 font-semibold"
            >
              <span>
                <IconPaperclip className="text-subPrimary rotate-45" />
              </span>
              <span>Browse Files...</span>
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-btnBg text-secondary hover:bg-btnBg mt-6 w-full cursor-pointer rounded-lg py-4 text-sm font-semibold"
          >
            Create Listing
          </Button>
        </Form>
      </div>
    </section>
  );
}
