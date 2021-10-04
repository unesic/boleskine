interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
	return (
		<div className="Spinner">
			<svg className="Spinner__SVG" width="80" height="80">
				<circle
					r="20"
					cx="40"
					cy="40"
					fill="none"
					strokeWidth="6"
					strokeLinecap="round"
					strokeDashoffset="0"
				/>
			</svg>
		</div>
	);
};
