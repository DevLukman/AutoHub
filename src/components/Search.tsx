"use client";
type Car = {
  sellerId: string;
  make: string;
  model: string;
  images: string[];
  year: string;
};
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { carsData } from "@/lib/dataService";
import { Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
export default function SearchButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<Car[] | null>(null);
  const closeRef = useOutsideClick(setIsOpen);
  useEffect(
    function () {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      }
      return () => document.body.classList.remove("overflow-hidden");
    },
    [isOpen],
  );
  useEffect(function () {
    async function fetchSearchData() {
      const data = await carsData();
      setSearchData(data);
    }
    fetchSearchData();
  }, []);
  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="hover:bg-main text-subPrimary hover:text-primary cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out"
        >
          <Search size="1rem" />
        </button>
        {isOpen && (
          <div className="bg-main/10 fixed inset-0 z-50 h-dvh w-full overflow-hidden backdrop-blur-sm">
            <div
              ref={closeRef}
              className="absolute top-[15%] left-[50%] w-full -translate-x-[50%] -translate-y-[50%] px-4 md:w-[50%] md:px-0"
            >
              <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex w-full items-center">
                  <Search
                    className="text-subPrimary absolute left-[2%]"
                    size={"17px"}
                  />
                  <input
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                    className="font-secondary bg-main text-primary border-border h-[2.85rem] w-full rounded-t-sm border-[0.5px] px-10 text-sm font-medium focus:outline-none"
                    type="text"
                    id="search-input"
                    placeholder="Search for cars"
                    aria-label="search"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                    }}
                    className="border-border text-subPrimary absolute right-[1.5%] cursor-pointer rounded-sm border px-2 py-1 text-[12px]"
                  >
                    Esc
                  </button>
                </div>
              </form>
              {search && (
                <div className="bg-main border-border absolute flex w-[92%] flex-col gap-2 rounded-b-lg border px-2 py-4 md:w-full">
                  {searchData?.map((search, index) => (
                    <Link
                      key={search.sellerId}
                      href={`/cars/${search.sellerId}`}
                      className="hover:bg-btnBg text- hover:text-secondary w-full rounded-sm px-1.5 py-2 text-sm transition duration-300 ease-out"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-[22px]">
                          <Image
                            src={search.images[index]}
                            alt={search.make}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-[2px] object-cover"
                          />
                        </div>
                        <p>{`${search.make} ${search.model} ${search.year}`}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
