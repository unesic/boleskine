import { useMemo, useRef, useCallback, useEffect } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectPopup, closePopup, clearPopup } from "store/app.slice";

/**
 * Components & Utils
 */
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "lib/hooks/useTranslation";
import { Button } from "ui/misc/Button";
import { Card, Header } from "ui/card";

interface ConfirmationPoupProps {}

export const ConfirmationPoup: React.FC<ConfirmationPoupProps> = () => {
	const popupRef = useRef() as React.RefObject<HTMLDivElement>;
	const _t = useTranslation("app");

	const dispatch = useDispatch();
	const popup = useSelector(selectPopup);

	const confirmText = useMemo(() => {
		return !popup.confirm ? _t.misc.popup.confirm : popup.confirm;
	}, [_t, popup.confirm]);

	const cancelText = useMemo(() => {
		return !popup.cancel ? _t.misc.popup.cancel : popup.cancel;
	}, [_t, popup.cancel]);

	const popupConfirm = useCallback(() => {
		dispatch(closePopup(true));
		setTimeout(() => {
			dispatch(clearPopup);
		}, 200);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup]);

	const popupCancel = useCallback(() => {
		dispatch(closePopup(false));
		setTimeout(() => {
			dispatch(clearPopup);
		}, 200);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup]);

	const handleEscKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.code !== "Escape") return;
			popupCancel();
		},
		[popupCancel]
	);

	useEffect(() => {
		document.addEventListener("keyup", handleEscKey);
		return () => {
			document.removeEventListener("keyup", handleEscKey);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CSSTransition
			in={popup.visible}
			timeout={200}
			classNames="ConfirmationPopup-"
			nodeRef={popupRef}
			unmountOnExit
		>
			<div ref={popupRef} className="ConfirmationPopup">
				<div className="ConfirmationPopup__inner">
					<Card>
						<Header title="Confirm entry delete" />
						<button
							className="Confirmation__close"
							onClick={popupCancel}
						></button>
						<div className="Confirmation__text">{popup.text}</div>
						<div className="Confirmation__Options">
							<Button
								variant="primary"
								className="Confirmation__Options__option"
								onClick={popupConfirm}
							>
								{confirmText}
							</Button>

							<Button
								variant="secondary"
								className="Confirmation__Options__option"
								onClick={popupCancel}
							>
								{cancelText}
							</Button>
						</div>
					</Card>
				</div>
				<div
					className="ConfirmationPopup__backdrop"
					onClick={popupCancel}
				></div>
			</div>
		</CSSTransition>
	);
};
