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
import { useTranslation } from "lib/hooks/useTranslation";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface EntryOptionsProps {}

type PositionType = {
	top: number | undefined;
	left: number | undefined;
	right: number | undefined;
};

export const EntryOptions: React.FC<EntryOptionsProps> = () => {
	const _t = useTranslation("app");
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
		if (visible) {
			document.body.classList.add("entry-options-open");
			return;
		}
		setTimeout(() => {
			document.body.classList.remove("entry-options-open");
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
		const entryOption = entry?.querySelector(".Option");

		if (!entryOption) return;

		const { x, y, right } = entryOption.getBoundingClientRect();
		const isNarrow = x > window.innerWidth * 0.9;

		setPosition({
			top: y,
			left: !isNarrow ? right : undefined,
			right: isNarrow ? window.innerWidth - x : undefined,
		});
		setVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetEntryId]);

	return (
		<CSSTransition
			in={visible}
			timeout={200}
			classNames="EntryOptions-"
			nodeRef={ref}
			unmountOnExit
		>
			<div
				ref={ref}
				className="EntryOptions"
				style={{
					top: position?.top,
					left: position?.left,
					right: position?.right,
				}}
			>
				<div className="EntryOptions__inner">
					<button className="EntryOption">
						<AiOutlineEdit /> {_t.tracking.edit_entry}
					</button>
					<button className="EntryOption">
						<AiOutlineDelete /> {_t.tracking.remove_entry}
					</button>
				</div>
			</div>
		</CSSTransition>
	);
};
