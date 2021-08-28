import { Card, Header } from "ui/card";

export const CardExample: React.VFC = () => {
	return (
		<div className="flex gap-4">
			<Card>
				<Header title="Card title 1" />
				<p className="text-app-light-100">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel
					assumenda id eos debitis impedit voluptate fugit corporis cupiditate
					in libero. Earum quis ipsum similique tenetur, iste blanditiis
					distinctio odit!
				</p>
			</Card>
			<Card>
				<Header title="Card title 2" />
				<p className="text-app-light-100">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel
					assumenda id eos debitis impedit voluptate fugit corporis cupiditate
					in libero. Earum quis ipsum similique tenetur, iste blanditiis
					distinctio odit!
				</p>
			</Card>
		</div>
	);
};
