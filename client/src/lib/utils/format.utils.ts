export const dateFormatter = new Intl.DateTimeFormat(["sr-Latn-RS"], {
	weekday: "short",
	year: "numeric",
	month: "short",
	day: "numeric",
	localeMatcher: "best fit",
});

export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const compactCurrency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
});
