import React from "react";
import Card, { Header, Title } from "ui/card/Card";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	return (
		<div className="grid grid-cols-12 gap-4 pt-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<aside className="col-span-2">sidebar</aside>
			<main className="col-span-10 grid grid-cols-12 gap-x-8 gap-y-4">
				<div className="col-span-3">
					<Card>
						<Header>
							<Title>Calendar</Title>
						</Header>
					</Card>
				</div>
				<div className="col-span-3 row-start-2">
					<Card>
						<Header>
							<Title>Current week</Title>
						</Header>
					</Card>
				</div>
				<div className="col-span-3 row-start-3">
					<Card>
						<Header>
							<Title>Current month</Title>
						</Header>
					</Card>
				</div>

				<div className="col-span-5 row-span-3">
					<Card>
						<Header>
							<Title>Expense and income</Title>
						</Header>
					</Card>
				</div>

				<div className="col-span-4 row-span-3">
					<Card>
						<Header>
							<Title>Add new entry</Title>
						</Header>
					</Card>
				</div>
			</main>
		</div>
	);
};
