/**
 * Base
 */
import { memo } from "react";

interface CaptionProps {
	className?: string;
}

export const Caption: React.FC<CaptionProps> = memo(
	({ className = "", children }) => {
		return <p className={`Field__Caption ${className}`.trim()}>{children}</p>;
	}
);
