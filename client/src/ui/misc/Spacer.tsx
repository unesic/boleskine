/**
 * Base
 */
import { memo } from "react";

interface SpacerProps {
	direction: "horizontal" | "vertical";
	className?: string;
	withText?: string | null;
}

export const Spacer: React.FC<SpacerProps> = memo(
	({ direction, className = "", withText = null }) => {
		return (
			<div
				className={`Spacer Spacer--${direction} ${
					withText ? `Spacer--with-text` : ""
				} ${className}`.trim()}
			>
				{withText ? (
					<span className="Spacer--with-text__text">{withText}</span>
				) : null}
			</div>
		);
	}
);
