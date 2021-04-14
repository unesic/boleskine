import React from "react";

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
	return <div className="Card">{children}</div>;
};

export default Card;

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
	return <div className="Card__Header">{children}</div>;
};

interface TitleProps {}

export const Title: React.FC<TitleProps> = ({ children }) => {
	return <div className="Card__Title">{children}</div>;
};
