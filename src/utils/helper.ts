import { SearchAndFilterProps } from "@/lib/Types";
export function formatToNaria(amount: number, locale: string = "en-NG") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

interface CarFilters {
  make?: {
    contains: string;
    mode: "insensitive";
  };
  model?: {
    contains: string;
    mode: "insensitive";
  };
  year?: number;
  condition?: {
    in: string[];
  };
  category?: {
    in: string[];
  };
  transmission?: {
    in: string[];
  };
  fuel?: {
    in: string[];
  };
}

export function buildCarFilters(searchParams: SearchAndFilterProps) {
  const filters: CarFilters = {};

  if (searchParams.brand) {
    filters.make = {
      contains: searchParams.brand,
      mode: "insensitive",
    };
  }

  if (searchParams.model) {
    filters.model = {
      contains: searchParams.model,
      mode: "insensitive",
    };
  }

  if (searchParams.year) {
    filters.year = parseInt(searchParams.year);
  }

  if (searchParams.condition) {
    const conditions = searchParams.condition.split(",").map((c) => c.trim());
    filters.condition = {
      in: conditions,
    };
  }

  if (searchParams.category) {
    const categories = searchParams.category.split(",").map((c) => c.trim());
    filters.category = {
      in: categories,
    };
  }

  if (searchParams.transmission) {
    const transmissions = searchParams.transmission
      .split(",")
      .map((t) => t.trim());
    filters.transmission = {
      in: transmissions,
    };
  }

  if (searchParams.fuel) {
    const fuelTypes = searchParams.fuel.split(",").map((f) => f.trim());
    filters.fuel = {
      in: fuelTypes,
    };
  }

  return filters;
}
