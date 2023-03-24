import { EntriesType, MonthType, Mutable } from "lib/types/shared.types";

export type SplitData = {
	[key: string]: MonthType[];
};

export type TotalType = {
	key: string;
	inc: number;
	exp: number;
};

type TotalsType = {
	[key in Mutable<Period> as string]: TotalType[] | null;
};

export type MasterDataType = {
	[year: string]: TotalsType;
};

export type Period = keyof typeof Periods;

export enum Periods {
	wow = "wow",
	mom = "mom",
	qoq = "qoq",
}

export type AnalysisTypeEntries = {
	[key: string]: EntriesType;
};

export type AnalysisTypes = {
	[key in Periods]: AnalysisTypeEntries;
};
