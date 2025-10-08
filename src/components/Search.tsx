"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { getSearch } from "../lib/actions/getBrowseCars";
import { CarListing } from "../lib/Types";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<CarListing[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const closeRef = useOutsideClick(setIsOpen);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const searchCars = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchData(null);
      setError(null);
      return;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const data = await getSearch(searchTerm);
      if (isMountedRef.current) {
        setSearchData(data);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error("Search failed:", error);
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setSearchData([]);
        setError("Search failed. Please try again.");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    searchCars(debouncedSearch);
  }, [debouncedSearch, searchCars]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSearchData(null);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleResultClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="hover:bg-main text-subPrimary hover:text-primary cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out"
          aria-label="Open search"
        >
          <Search size={16} />
        </button>
        {isOpen && (
          <div className="bg-main/10 fixed inset-0 z-50 h-dvh w-full overflow-hidden pt-20 backdrop-blur-sm">
            <div
              ref={closeRef}
              className="absolute top-[10%] left-[50%] w-full -translate-x-[50%] px-4 md:w-[50%] md:px-0"
            >
              <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex w-full items-center">
                  <Search
                    className="text-subPrimary absolute left-[2%]"
                    size={17}
                    aria-hidden="true"
                  />
                  <input
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    className="font-secondary bg-main text-primary border-border h-[2.85rem] w-full rounded-t-sm border-[0.5px] px-10 text-sm font-medium focus:outline-none"
                    type="text"
                    id="search-input"
                    placeholder="Search for cars"
                    aria-label="Search for cars"
                    autoFocus
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={handleClose}
                    className="border-border text-subPrimary focus:ring-primary focus:ring-opacity-50 absolute right-[1.5%] cursor-pointer rounded-sm border px-2 py-1 text-[12px] hover:bg-gray-100 focus:ring-2 focus:outline-none"
                    aria-label="Close search"
                  >
                    Esc
                  </button>
                </div>
              </form>
              {search && (
                <div className="bg-main border-border absolute right-0 left-0 flex flex-col gap-2 rounded-b-lg border px-2 py-4">
                  {isLoading ? (
                    <div
                      className="flex items-center justify-center py-4"
                      role="status"
                      aria-label="Searching"
                    >
                      <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2"></div>
                      <span className="sr-only">Searching...</span>
                    </div>
                  ) : error ? (
                    <div
                      className="py-4 text-center text-sm text-red-500"
                      role="alert"
                    >
                      {error}
                    </div>
                  ) : searchData && searchData.length > 0 ? (
                    <>
                      <div className="sr-only" role="status">
                        {searchData.length} results found
                      </div>
                      {searchData.map((car) => (
                        <Link
                          key={car?.id}
                          href={`/cars/${car?.id}`}
                          className="hover:bg-btnBg hover:text-secondary focus:ring-primary focus:ring-opacity-50 w-full rounded-sm px-1.5 py-2 text-sm transition duration-300 ease-out focus:ring-2 focus:outline-none"
                          role="option"
                          onClick={handleResultClick}
                          aria-label={`View ${car?.make} ${car?.model} ${car?.year}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative h-6 w-[22px] flex-shrink-0">
                              <Image
                                src={car?.images?.[0]?.url ?? ""}
                                alt=""
                                fill
                                sizes="22px"
                                className="rounded-[2px] object-cover"
                              />
                            </div>
                            <p className="truncate">{`${car?.make} ${car?.model} ${car?.year}`}</p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : searchData !== null ? (
                    <div
                      className="text-subPrimary py-4 text-center text-sm"
                      role="status"
                    >
                      No cars found for &quot;{search}&quot;
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
