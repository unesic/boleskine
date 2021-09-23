/**
 * Base
 */
import { useState, useEffect, useCallback, useContext } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	addNotification,
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
 * Utilities
 */
import { EntryInitialValues, useEntryForm } from "lib/hooks/useEntryForm";
import { useTranslation } from "lib/hooks/useTranslation";
import { useVisible } from "lib/hooks/useVisible";
import { useGetEntryData } from "lib/utils/useGetEntryData";
import { PopupContext } from "lib/utils/PopupContext";

/**
 * Icons
 */
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
	updateEntryInMonths,
	updateEntryInActiveDays,
	removeEntryFromMonths,
	removeEntryFromActiveDays,
} from "store/track.slice";

enum ENTRY_ACTIONS {
	UPDATE = "UPDATE",
	DELETE = "DELETE",
}

interface EntryOptionsProps {}

type PositionType = {
	top: number | undefined;
	left: number | undefined;
	right: number | undefined;
};

export const EntryOptions: React.FC<EntryOptionsProps> = () => {
	const [position, setPosition] = useState<PositionType | null>(null);
	const { setPopupContent } = useContext(PopupContext);

	const dispatch = useDispatch();
	const targetEntryId = useSelector(selectTargetEntryId);
	const popup = useSelector(selectPopup);

	const _t = useTranslation("app");
	const _tNot = useTranslation("notifications");

	const entryData = useGetEntryData(targetEntryId);
	const [ref, visible, setVisible] = useVisible(false, (t: any) => {
		const btnCheck = ".Entries__Entry button.Option";
		const iconCheck = ".Entries__Entry button.Option *";
		const popupCheck = ".ConfirmationPopup, .ConfirmationPopup *";
		return !(
			t.matches(btnCheck) ||
			t.matches(iconCheck) ||
			t.matches(popupCheck)
		);
	});

	useEffect(() => {
		if (visible) {
			document.body.classList.add("entry-options-open");
			return;
		}
		setTimeout(() => {
			document.body.classList.remove("entry-options-open");
			dispatch(clearTargetEntryId());
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
		const { execute, action } = popup;

		if (typeof execute === "undefined" || !targetEntryId) return;
		if (!execute) {
			setVisible(false);
			return;
		}

		if (action === ENTRY_ACTIONS.UPDATE && entryData !== values) {
			submitUpdate();
		} else if (action === ENTRY_ACTIONS.DELETE) {
			deleteEntry({ variables: { id: targetEntryId } });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup, targetEntryId]);

	const onEntryUpdate = async (values: EntryInitialValues) => {
		const { description, amount, type } = values;
		await updateEntry({
			variables: {
				id: targetEntryId,
				type: type!.value,
				amount: amount.toString(),
				description: description,
			},
		});
	};

	const [EditForm, submitUpdate, values, errors, touched] = useEntryForm(
		onEntryUpdate,
		false,
		entryData
	);

	useEffect(() => {
		if (!touched && !Object.keys(errors).length) return;
		setPopupContent(EditForm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, errors, touched]);

	const [updateEntry] = useMutation(UPDATE_ENTRY, {
		onCompleted({ updateEntry }) {
			dispatch(updateEntryInMonths({ ...updateEntry }));
			dispatch(updateEntryInActiveDays({ ...updateEntry }));
			setVisible(false);
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.entry.updated.title,
					text: `${_tNot.entry.updated.text} '${updateEntry.description}'`,
					type: "success",
				})
			);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.error.title,
					text: `${_tNot.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	const [deleteEntry] = useMutation(DELETE_ENTRY, {
		onCompleted({ deleteEntry }) {
			dispatch(removeEntryFromActiveDays({ ...deleteEntry }));
			dispatch(removeEntryFromMonths({ ...deleteEntry }));
			setVisible(false);
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.entry.deleted.title,
					text: `${_tNot.entry.deleted.text} '${deleteEntry.description}'`,
					type: "success",
				})
			);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.error.title,
					text: `${_tNot.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	const onEdit = useCallback(() => {
		setPopupContent(EditForm);
		dispatch(
			setPopup({
				visible: true,
				title: "Edit entry",
				confirm: "Update",
				cancel: "Discard",
				action: ENTRY_ACTIONS.UPDATE,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [EditForm]);

	const onRemove = useCallback(() => {
		setPopupContent("Are you sure you want to delete this entry?");
		dispatch(
			setPopup({
				visible: true,
				title: "Delete entry",
				confirm: "Yes, delete it.",
				cancel: "I changed my mind.",
				action: ENTRY_ACTIONS.DELETE,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
