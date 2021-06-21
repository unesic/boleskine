/**
 * Base
 */
import { useCallback, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { clearTargetEntryId, selectTargetEntryId } from "store/app.slice";

/**
 * Utilities & Icons
 */
import { useVisible } from "lib/hooks/useVisible";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface EntryOptionsProps {}

type PositionType = {
	x: number;
	y: number;
};

export const EntryOptions: React.FC<EntryOptionsProps> = () => {
	const dispatch = useDispatch();
	const targetEntryId = useSelector(selectTargetEntryId);

	const check = useCallback((target: any) => {
		const btnCheck = ".Entries__Entry button.Option";
		const iconCheck = ".Entries__Entry button.Option *";
		return !(target.matches(btnCheck) || target.matches(iconCheck));
	}, []);

	const [position, setPosition] = useState<PositionType | null>(null);
	const [ref, visible, setVisible] = useVisible(false, check);

	useEffect(() => {
		if (visible) return;
		setTimeout(() => {
			dispatch(clearTargetEntryId(null));
		}, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	useEffect(() => {
		if (!targetEntryId) {
			setPosition(null);
			return;
		}

		if (targetEntryId.includes("%same_entry%")) {
			setVisible(false);
		}

		const entry = document.getElementById(targetEntryId);
		if (!entry) return;

		const { width, top, left } = entry.getBoundingClientRect();
		setPosition({ x: width + left, y: top });
		setVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetEntryId]);

	return (
		<CSSTransition
			in={visible}
			timeout={300}
			classNames="EntryOptions-"
			nodeRef={ref}
		>
			<div
				ref={ref}
				className="EntryOptions"
				style={{ top: position?.y, left: position?.x }}
			>
				<div className="EntryOptions__inner">
					<button className="EntryOption">
						<AiOutlineEdit /> Edit Entry
					</button>
					<button className="EntryOption">
						<AiOutlineDelete /> Remove Entry
					</button>
				</div>
			</div>
		</CSSTransition>
	);
};
