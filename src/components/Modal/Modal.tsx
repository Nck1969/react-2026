import { type FC, type PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps extends PropsWithChildren {
	title: string;
	onClose: VoidFunction;
}

const Modal: FC<ModalProps> = ({ children, title, onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", handleEsc);
		modalRef.current?.focus();

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [onClose]);

	return createPortal(
		<div
			className={classes.modalOverlay}
			role={"presentation"}
			onClick={onClose}
		>
			<div
				ref={modalRef}
				className={classes.modal}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				tabIndex={-1}
			>
				<div className={classes.modalHeader}>
					<span className={classes.modalTitle}>{title}</span>
					<button
						className={classes.modalCloseButton}
						type={"button"}
						onClick={onClose}
					>
						X
					</button>
				</div>
				<div className={classes.modalBody}>{children}</div>
			</div>
		</div>,
		document.body,
	);
};
Modal.displayName = "Modal";

export { Modal };
