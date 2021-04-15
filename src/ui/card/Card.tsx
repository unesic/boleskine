import React from "react";
import {
	SwitchVerticalIcon,
	CogIcon,
	XIcon,
	SwitchHorizontalIcon,
} from "@heroicons/react/outline";
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
}

export const Header: React.FC<HeaderProps> = ({
	title,
	xMove = false,
	yMove = false,
	noSettings = false,
	noClose = false,
}) => {
	return (
		<div className="Card__Header">
			<Title>{title}</Title>
			<Options
				xMove={xMove}
				yMove={yMove}
				noSettings={noSettings}
				noClose={noClose}
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
}

export const Options: React.FC<OptionsProps> = ({
	xMove,
	yMove,
	noSettings,
	noClose,
}) => {
	return (
		<div className="Card__Options">
			{xMove ? (
				<button className="Card__Button">
					<SwitchHorizontalIcon />
				</button>
			) : null}
			{yMove ? (
				<button className="Card__Button">
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
