import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const categorys = [
  { id: 1, name: "sedan", to: "sedan" },
  { id: 2, name: "coupe", to: "coupe" },
  { id: 3, name: "suv", to: "suv" },
  { id: 10, name: "crossover", to: "crossover" },
  { id: 4, name: "wagon/hatchback", to: "wagon/hatchback" },
  { id: 5, name: "Green car/hybrid", to: "Green car/hybrid" },
  { id: 6, name: "convertible", to: "convertible" },
  { id: 7, name: "sports Car", to: "sports Car" },
  { id: 8, name: "Pick up truck", to: "pickup truck" },
  { id: 9, name: "Luxury car", to: "Luxury car" },
];
const condition = [
  { id: 1, name: "new", to: "new" },
  { id: 2, name: "Used", to: "Used" },
  { id: 3, name: "Certified pre owned", to: "Certified pre owned" },
  { id: 10, name: "Damaged", to: "Damaged" },
];
const transmission = [
  { id: 1, name: "Automatic", to: "Automatic" },
  { id: 2, name: "manual", to: "manual" },
];
const fuelType = [
  { id: 1, name: "petrol", to: "petrol" },
  { id: 2, name: "Diesel", to: "Diesel" },
  { id: 3, name: "Electric", to: "Electric" },
  { id: 10, name: "Hybrid", to: "Hybrid" },
];
export default function Filter() {
  return (
    <div className="border-border hidden h-fit rounded-lg border py-2 md:block">
      <div className="border-border flex flex-col gap-2 border-b px-4 pb-3">
        <p className="my-2 flex items-center justify-between text-sm">
          <span>Category</span>
          <span>
            <MdOutlineKeyboardArrowLeft className="cursor-pointer" />
          </span>
        </p>
        {categorys.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox id={category.name} className="cursor-pointer" />
            <Label
              htmlFor={category.name}
              className="text-subPrimary cursor-pointer capitalize"
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
        {condition.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={category.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
            />
            <Label
              htmlFor={category.name}
              className="text-subPrimary cursor-pointer capitalize"
            >
              {category.name}
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
        {transmission.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={category.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
            />
            <Label
              htmlFor={category.name}
              className="text-subPrimary cursor-pointer capitalize"
            >
              {category.name}
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
        {fuelType.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={category.name}
              className="cursor-pointer rounded-[3px] accent-amber-300"
            />
            <Label
              htmlFor={category.name}
              className="text-subPrimary cursor-pointer capitalize"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
