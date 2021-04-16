import React from "react";
import {
	SwitchVerticalIcon,
	CogIcon,
	XIcon,
	SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

import "assets/dist/components/Card.css";

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
	return <div className="Card">{children}</div>;
};

export default Card;

interface HeaderProps {
	title: string;
	xMove?: boolean;
	yMove?: boolean;
	noSettings?: boolean;
	noClose?: boolean;
	dragHandleX?: DraggableProvidedDragHandleProps | undefined;
	dragHandleY?: DraggableProvidedDragHandleProps | undefined;
}

export const Header: React.FC<HeaderProps> = ({
	title,
	xMove = false,
	yMove = false,
	noSettings = false,
	noClose = false,
	dragHandleX = undefined,
	dragHandleY = undefined,
}) => {
	return (
		<div className="Card__Header">
			<Title>{title}</Title>
			<Options
				xMove={xMove}
				yMove={yMove}
				noSettings={noSettings}
				noClose={noClose}
				dragHandleX={dragHandleX}
				dragHandleY={dragHandleY}
			/>
		</div>
	);
};

interface TitleProps {}

export const Title: React.FC<TitleProps> = ({ children }) => {
	return <div className="Card__Title">{children}</div>;
};

interface OptionsProps {
	xMove: boolean;
	yMove: boolean;
	noSettings: boolean;
	noClose: boolean;
	dragHandleX?: DraggableProvidedDragHandleProps | undefined;
	dragHandleY?: DraggableProvidedDragHandleProps | undefined;
}

export const Options: React.FC<OptionsProps> = ({
	xMove,
	yMove,
	noSettings,
	noClose,
	dragHandleX,
	dragHandleY,
}) => {
	return (
		<div className="Card__Options">
			{xMove ? (
				<button className="Card__Button" {...dragHandleX}>
					<SwitchHorizontalIcon />
				</button>
			) : null}
			{yMove ? (
				<button className="Card__Button" {...dragHandleY}>
					<SwitchVerticalIcon />
				</button>
			) : null}
			{!noSettings ? (
				<button className="Card__Button">
					<CogIcon />
				</button>
			) : null}
			{!noClose ? (
				<button className="Card__Button">
					<XIcon />
				</button>
			) : null}
		</div>
	);
};
