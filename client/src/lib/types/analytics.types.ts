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
	[key in Mutable<Period>]: TotalType[] | null;
};

export type MasterDataType = {
	[year: string]: TotalsType;
};

export type Period = keyof typeof Periods;

export enum Periods {
	wow = "wow" as any,
	mom = "mom" as any,
	qoq = "qoq" as any,
}

export type AnalysisTypeEntries = {
	[key: string]: EntriesType;
};

export type AnalysisTypes = {
	[key in Periods]: AnalysisTypeEntries;
};
