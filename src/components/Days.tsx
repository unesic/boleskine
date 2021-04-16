import React from "react";

import "assets/dist/components/Days.css";
import Card, { Header } from "ui/card/Card";
import { Day, DayType } from "./Day";

export type DaysType = DayType[];

interface DaysProps {
	days?: DayType[];
}

export const Days: React.FC<DaysProps> = ({ days }) => {
	const dummyDays: DaysType = [
		{
			id: "1",
			date: new Date(),
			entries: [
				{
					id: "11",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "12",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "13",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
		{
			id: "2",
			date: new Date(),
			entries: [
				{
					id: "21",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "22",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "23",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
		{
			id: "3",
			date: new Date(),
			entries: [
				{
					id: "31",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "32",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "33",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
		{
			id: "4",
			date: new Date(),
			entries: [
				{
					id: "41",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "42",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "43",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
		{
			id: "5",
			date: new Date(),
			entries: [
				{
					id: "51",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "52",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "53",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
		{
			id: "6",
			date: new Date(),
			entries: [
				{
					id: "61",
					text: "Lorem ipsum dolor sit amet",
					type: "inc",
					amount: "22.00",
				},
				{
					id: "62",
					text: "Lorem ipsum dolor sit amet",
					type: "exp",
					amount: "10.00",
				},
				{
					id: "63",
					text: "Lorem ipsum dolor sit amet",
					type: "not",
				},
			],
		},
	];

	return (
		<Card>
			<Header title="Expense and income" xMove />
			<div className="Days">
				{dummyDays.map((day) => (
					<Day key={day.id} {...day} />
				))}
			</div>
		</Card>
	);
};
