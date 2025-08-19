export function formatToNaria(amount: number, locale: string = "en-NG") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  }).format(amount);
}
