import { memo } from "react";

export const Error: React.FC = memo(({ children }) => {
	return <div className="Error">{children}</div>;
});
