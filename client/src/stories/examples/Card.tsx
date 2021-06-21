import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Card, DraggableCard, Header } from "ui/card";

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

interface DraggableCardExampleProps {
	direction: "horizontal" | "vertical";
}

export const DraggableCardExample: React.VFC<DraggableCardExampleProps> = ({
	direction: dir,
}) => {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<Droppable droppableId="cards" type="cards" direction={dir}>
				{({ innerRef, placeholder }) => (
					<div
						ref={innerRef}
						className={`flex gap-4 ${
							dir === "horizontal" ? "flex-row" : "flex-col"
						}`}
					>
						<DraggableCard draggableId="0" index={0}>
							{(dragHandle) => (
								<>
									<Header
										title="Card title 1"
										xMove={dir === "horizontal"}
										yMove={dir === "vertical"}
										dragHandleX={dir === "horizontal" ? dragHandle : undefined}
										dragHandleY={dir === "vertical" ? dragHandle : undefined}
									/>
									<p className="text-app-light-100">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Qui, vel assumenda id eos debitis impedit voluptate fugit
										corporis cupiditate in libero. Earum quis ipsum similique
										tenetur, iste blanditiis distinctio odit!
									</p>
								</>
							)}
						</DraggableCard>
						<DraggableCard draggableId="1" index={1}>
							{(dragHandle) => (
								<>
									<Header
										title="Card title 2"
										xMove={dir === "horizontal"}
										yMove={dir === "vertical"}
										dragHandleX={dir === "horizontal" ? dragHandle : undefined}
										dragHandleY={dir === "vertical" ? dragHandle : undefined}
									/>
									<p className="text-app-light-100">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Qui, vel assumenda id eos debitis impedit voluptate fugit
										corporis cupiditate in libero. Earum quis ipsum similique
										tenetur, iste blanditiis distinctio odit!
									</p>
								</>
							)}
						</DraggableCard>
						{placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
