export type EntryType = {
	id: string;
	timestamp: string;
	description: string;
	type: string;
	amount?: string | null;
	monthId?: string;
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

export type NotificationType = {
	id: string;
	title: String;
	text: String;
	type: "normal" | "success" | "error";
};

export type NotificationsType = NotificationType[];

export type Mutable<T> = T &
	{
		-readonly [P in keyof T]: T[P];
	};
