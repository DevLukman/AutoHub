import Form from "next/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <Form
      action={"/cars"}
      className="flex w-full flex-col items-center justify-center gap-4 md:flex-row"
    >
      <Select name="brand">
        <SelectTrigger className="w-full md:w-[250px]" size="default">
          <SelectValue placeholder="Select  Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Toyota">Toyota</SelectItem>
            <SelectItem value="Honda">Honda</SelectItem>
            <SelectItem value="BMW">BMW</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select name="model">
        <SelectTrigger className="w-full md:w-[250px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Camry">Camry</SelectItem>
            <SelectItem value="Corrola">Corrola</SelectItem>
            <SelectItem value="Rav4">Rav4</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select name="year">
        <SelectTrigger className="w-full md:w-[250px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="bg-btnBg text-main hover:bg-btnBg font-inter h-10 w-full cursor-pointer font-medium md:w-fit"
      >
        <span>
          <Search />
        </span>
        <span>Search</span>
      </Button>
    </Form>
  );
}
