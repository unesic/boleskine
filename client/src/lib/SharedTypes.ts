export type EntryType = {
	id: string;
	timestamp: string;
	description: string;
	type: string;
	amount?: string | null;
};

export type EntriesType = EntryType[];

export type DayType = {
	id: string;
	date: string;
	entries: EntriesType;
};

export type TrackingType = DayType[];

export type UserType = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string;
	token: string;
};

export type MonthType = {
	id: string;
	date: string;
	entries: EntriesType;
};
