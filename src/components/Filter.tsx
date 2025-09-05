"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const categories = [
  { id: 1, name: "sedan", to: "sedan" },
  { id: 2, name: "coupe", to: "coupe" },
  { id: 3, name: "suv", to: "suv" },
  { id: 10, name: "crossover", to: "crossover" },
  { id: 4, name: "wagon/hatchback", to: "wagon/hatchback" },
  { id: 5, name: "Green car/hybrid", to: "green car/hybrid" },
  { id: 6, name: "convertible", to: "convertible" },
  { id: 7, name: "sports Car", to: "sports Car" },
  { id: 8, name: "Pick up truck", to: "pickup truck" },
  { id: 9, name: "Luxury car", to: "luxury car" },
];

const conditions = [
  { id: 1, name: "new", to: "new" },
  { id: 2, name: "Used", to: "used" },
  { id: 3, name: "Certified pre owned", to: "certified pre owned" },
  { id: 10, name: "Damaged", to: "damaged" },
];

const transmissions = [
  { id: 1, name: "Automatic", to: "automatic" },
  { id: 2, name: "manual", to: "manual" },
];

const fuelTypes = [
  { id: 1, name: "petrol", to: "petrol" },
  { id: 2, name: "Diesel", to: "diesel" },
  { id: 3, name: "Electric", to: "electric" },
  { id: 10, name: "Hybrid", to: "hybrid" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(paramName: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.get(paramName);
    if (currentValues) {
      const valuesArray = currentValues.split(",");
      if (valuesArray.includes(value)) {
        const filteredValues = valuesArray.filter((v) => v !== value);
        if (filteredValues.length > 0) {
          params.set(paramName, filteredValues.join(","));
        } else {
          params.delete(paramName);
        }
      } else {
        params.set(paramName, [...valuesArray, value].join(","));
      }
    } else {
      params.set(paramName, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function isSelected(paramName: string, value: string): boolean {
    const currentValues = searchParams.get(paramName);
    if (!currentValues) return false;
    return currentValues.split(",").includes(value);
  }

  return (
    <div className="border-border hidden h-fit rounded-lg border py-2 md:block">
      <div className="border-border flex flex-col gap-2 border-b px-4 pb-3">
        <p className="my-2 flex items-center justify-between text-sm">
          <span>Category</span>
          <span>
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
          </span>
        </p>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={category.name}
              className="cursor-pointer"
              checked={isSelected("category", category.to)}
              onClick={() => handleFilter("category", category.to)}
            />
            <Label
              htmlFor={category.name}
              className="text-subPrimary cursor-pointer capitalize"
              onClick={() => handleFilter("category", category.to)}
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
      <div className="border-border flex flex-col gap-2 border-b px-4 pb-3">
        <p className="my-2 flex items-center justify-between text-sm">
          <span>Condition</span>
          <span>
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
          </span>
        </p>
        {conditions.map((condition) => (
          <div key={condition.id} className="flex items-center gap-2">
            <Checkbox
              id={condition.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
              checked={isSelected("condition", condition.to)}
              onClick={() => handleFilter("condition", condition.to)}
            />
            <Label
              htmlFor={condition.name}
              className="text-subPrimary cursor-pointer capitalize"
              onClick={() => handleFilter("condition", condition.to)}
            >
              {condition.name}
            </Label>
          </div>
        ))}
      </div>
      <div className="border-border flex flex-col gap-2 border-b px-4 pb-3">
        <p className="my-2 flex items-center justify-between text-sm">
          <span>Transmission</span>
          <span>
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
          </span>
        </p>
        {transmissions.map((transmissionItem) => (
          <div key={transmissionItem.id} className="flex items-center gap-2">
            <Checkbox
              id={transmissionItem.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
              checked={isSelected("transmission", transmissionItem.to)}
              onClick={() => handleFilter("transmission", transmissionItem.to)}
            />
            <Label
              htmlFor={transmissionItem.name}
              className="text-subPrimary cursor-pointer capitalize"
              onClick={() => handleFilter("transmission", transmissionItem.to)}
            >
              {transmissionItem.name}
            </Label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 px-4 pb-3">
        <p className="my-2 flex items-center justify-between text-sm">
          <span>FuelType</span>
          <span>
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
          </span>
        </p>
        {fuelTypes.map((fuel) => (
          <div key={fuel.id} className="flex items-center gap-2">
            <Checkbox
              id={fuel.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
              checked={isSelected("fuel", fuel.to)}
              onClick={() => handleFilter("fuel", fuel.to)}
            />
            <Label
              htmlFor={fuel.name}
              className="text-subPrimary cursor-pointer capitalize"
            >
              {fuel.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
