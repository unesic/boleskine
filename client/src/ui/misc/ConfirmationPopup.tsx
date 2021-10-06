/**
 * Vase
 */
import { useMemo, useRef, useCallback, useEffect, useContext } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectPopup, closePopup, clearPopup } from "store/app.slice";

/**
 * Utilities
 */
import { PopupContext } from "lib/PopupContext";
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { CSSTransition } from "react-transition-group";
import { Card, Header } from "ui/card";
import { Button } from "ui/misc/Button";

interface ConfirmationPoupProps {}

export const ConfirmationPoup: React.FC<ConfirmationPoupProps> = () => {
	const { popupContent, setPopupContent } = useContext(PopupContext);
	const popupRef = useRef() as React.RefObject<HTMLDivElement>;
	const _t = useTranslation("app");

	const dispatch = useDispatch();
	const popup = useSelector(selectPopup);

	const confirmText = useMemo(() => {
		return !popup.confirm ? _t.popup.default.confirm : popup.confirm;
	}, [_t, popup.confirm]);

	const cancelText = useMemo(() => {
		return !popup.cancel ? _t.popup.default.cancel : popup.cancel;
	}, [_t, popup.cancel]);

	const popupConfirm = useCallback(() => {
		dispatch(closePopup(true));
		setTimeout(() => {
			dispatch(clearPopup());
			setPopupContent(null);
		}, 200);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup]);

	const popupCancel = useCallback(() => {
		dispatch(closePopup(false));
		setTimeout(() => {
			dispatch(clearPopup());
			setPopupContent(null);
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
						<Header title={popup.title} />
						<button
							className="Confirmation__close"
							onClick={popupCancel}
						></button>
						<div className="Confirmation__content">{popupContent}</div>
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
