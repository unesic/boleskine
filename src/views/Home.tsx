import moment from "moment";
import React, { useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

import "assets/dist/components/Calendar.css";

import Card, { Header } from "ui/card/Card";
import { InputText } from "ui/form/InputText";
import { InputSelect } from "ui/form/InputSelect";
import { Button } from "ui/misc/Button";
import { Days, DaysType } from "components/Days";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const [select, setSelect] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");

	const [date, setDate] = useState(new Date());
	const markedDates = [
		{
			date: "30-03-2021",
			marks: ["inc", "exp", "not"],
		},
		{
			date: "04-04-2021",
			marks: ["inc", "exp", "not"],
		},
		{
			date: "07-04-2021",
			marks: ["inc", "exp", "not"],
		},
		{
			date: "09-04-2021",
			marks: ["not"],
		},
		{
			date: "10-04-2021",
			marks: ["inc", "not"],
		},
		{
			date: "13-04-2021",
			marks: ["not"],
		},
		{
			date: "17-04-2021",
			marks: ["exp", "not"],
		},
	];

	const onChange = (value: Date | Date[]) => {
		setDate(value as Date);
	};

	const setTileClassName = (props: CalendarTileProperties): string | null => {
		const marked = findMarked(props.date);
		if (!marked) return null;
		return "react-calendar__month-view__days__day--marked";
	};

	const setTileDisabled = (props: CalendarTileProperties): boolean => {
		const marked = findMarked(props.date);
		return !marked ? true : false;
	};

	const setTileContent = (
		props: CalendarTileProperties
	): JSX.Element | null => {
		const marked = findMarked(props.date);
		if (!marked) return null;

		return (
			<span className="markers">
				{marked.marks.map((mark) => (
					<span className={`marker marker--${mark}`}>•</span>
				))}
			</span>
		);
	};

	function findMarked(target: Date) {
		return markedDates.find(
			({ date }) => date === moment(target).format("DD-MM-YYYY")
		);
	}

	const days: DaysType = [
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
		<div className="grid grid-cols-12 gap-4 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<aside className="col-span-2 row-span-3">sidebar</aside>
			<main className="relative col-span-10 flex gap-4 justify-between">
				<div
					className="flex flex-col gap-4"
					style={{ flex: "1 0 25%", maxWidth: "25%" }}
				>
					<Card>
						<Header title="Calendar" yMove />
						<Calendar
							value={date}
							onChange={onChange}
							tileClassName={setTileClassName}
							// tileDisabled={setTileDisabled}
							tileContent={setTileContent}
							nextLabel={<ChevronRightIcon />}
							next2Label={<ChevronDoubleRightIcon />}
							prevLabel={<ChevronLeftIcon />}
							prev2Label={<ChevronDoubleLeftIcon />}
						/>
					</Card>

					<Card>
						<Header title="Current week" yMove />
						<div>
							<p className="text-xs text-app-light-tertiary text-opacity-30">
								<strong>12 Apr – 18 Apr, 2021</strong>
							</p>
							<div className="px-2 pb-2">
								<div className="mt-4">
									<p className="text-sm text-app-accent-green">
										TOTAL INCOME
									</p>
									<p className="mt-2 pl-2 text-2xl text-app-light-primary">
										<strong>$1,337.00</strong>
									</p>
								</div>
								<div className="mt-4">
									<p className="text-sm text-app-accent-red">
										TOTAL EXPENSE
									</p>
									<p className="mt-2 pl-2 text-2xl text-app-light-primary">
										<strong>$360.00</strong>
									</p>
								</div>
							</div>
						</div>
					</Card>

					<Card>
						<Header title="Current month" yMove />
						<div>
							<p className="text-xs text-app-light-tertiary text-opacity-30">
								<strong>April, 2021</strong>
							</p>
							<div className="px-2 pb-2">
								<div className="mt-4">
									<p className="text-sm text-app-accent-green">
										TOTAL INCOME
									</p>
									<p className="mt-2 pl-2 text-2xl text-app-light-primary">
										<strong>$69,420.00</strong>
									</p>
								</div>
								<div className="mt-4">
									<p className="text-sm text-app-accent-red">
										TOTAL EXPENSE
									</p>
									<p className="mt-2 pl-2 text-2xl text-app-light-primary">
										<strong>$42,690.00</strong>
									</p>
								</div>
							</div>
						</div>
					</Card>
				</div>

				<div
					className="absolute left-1/4 h-full px-4"
					style={{ width: "42%" }}
				>
					<Card>
						<Header title="Expense and income" xMove />
						<Days days={days} />
					</Card>
				</div>

				<div
					className="h-max"
					style={{ flex: "1 0 33%", maxWidth: "33%" }}
				>
					<Card>
						<Header title="Add new entry" xMove />
						<InputText
							type="text"
							name="description"
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<InputSelect
							name="entry_type"
							value={select}
							onChange={(e) => setSelect(e.target.value)}
							label="Entry type"
							options={[
								{ title: "Income", val: "0" },
								{ title: "Expense", val: "1" },
								{ title: "Note", val: "2" },
							]}
						/>
						<InputText
							type="number"
							name="amount"
							label="Amount"
							value={amount}
							onChange={(e) =>
								setAmount(
									e.target.value !== ""
										? parseFloat(e.target.value).toString()
										: ""
								)
							}
						/>
						<Button>Add new entry</Button>
					</Card>
				</div>
			</main>
		</div>
	);
};
