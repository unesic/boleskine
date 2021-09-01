/**
 * Base
 */
import { useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	clearTargetEntryId,
	selectPopup,
	selectTargetEntryId,
	setPopup,
} from "store/app.slice";

/**
 * Apollo
 */
import { useMutation } from "@apollo/client";
import { DELETE_ENTRY, UPDATE_ENTRY } from "lib/graphql/entry.queries";

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
	const popup = useSelector(selectPopup);

	const [position, setPosition] = useState<PositionType | null>(null);
	const [ref, visible, setVisible] = useVisible(false, (target: any) => {
		const btnCheck = ".Entries__Entry button.Option";
		const iconCheck = ".Entries__Entry button.Option *";
		const popupCheck = ".ConfirmationPopup, .ConfirmationPopup *";
		return !(
			target.matches(btnCheck) ||
			target.matches(iconCheck) ||
			target.matches(popupCheck)
		);
	});

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
		const isNarrow = x / window.innerWidth > 0.825;

		setPosition({
			top: y,
			left: !isNarrow ? right + 8 : undefined,
			right: isNarrow ? window.innerWidth - x : undefined,
		});
		setVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetEntryId]);

	useEffect(() => {
		if (typeof popup.execute === "undefined") return;

		if (popup.execute) {
			// action confirmed, execute it
		} else {
			// action cancelled, abort
		}
	}, [popup]);

	const [updateEntry] = useMutation(UPDATE_ENTRY, {
		onCompleted({ updateEntry }) {},
		onError(err) {
			console.log(err);
		},
	});

	const [deleteEntry] = useMutation(DELETE_ENTRY, {
		onCompleted({ deleteEntry }) {},
		onError(err) {
			console.log(err);
		},
	});

	const onEdit = useCallback(() => {}, []);

	const onRemove = useCallback(() => {
		const test = <div>TEST</div>;
		dispatch(
			setPopup({
				visible: true,
				// text: "Are you sure you want to delete this entry?",
				text: test,
				confirm: "Yes, delete it.",
				cancel: "I changed my mind.",
			})
		);
	}, []);

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
					<button className="EntryOption" onClick={onEdit}>
						<AiOutlineEdit /> {_t.tracking.edit_entry}
					</button>
					<button className="EntryOption" onClick={onRemove}>
						<AiOutlineDelete /> {_t.tracking.remove_entry}
					</button>
				</div>
			</div>
		</CSSTransition>
	);
};
