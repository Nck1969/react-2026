import clsx from "clsx";
import { type FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RHFForm } from "../Forms/RHFForm/RHFForm.tsx";
import { UncontrolledForm } from "../Forms/UncontrolledForm/UncontrolledForm.tsx";
import classes from "./FormsModal.module.css";

interface ModalProps {
	onClose: VoidFunction;
}

const FormsModal: FC<ModalProps> = ({ onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isDisplayRHFForm, setIsDisplayRHFForm] = useState(true);

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
					<button
						className={classes.modalCloseButton}
						type={"button"}
						onClick={onClose}
					>
						X
					</button>
				</div>
				<div className={classes.modalContent}>
					<div className={classes.modalFormSwitcher}>
						<button
							type={"button"}
							onClick={() => setIsDisplayRHFForm(true)}
							className={clsx(
								classes.modalFormSwitcherItem,
								isDisplayRHFForm && classes.modalFormSwitcherItemActive,
							)}
						>
							React Hook Form
						</button>
						<button
							type={"button"}
							onClick={() => setIsDisplayRHFForm(false)}
							className={clsx(
								classes.modalFormSwitcherItem,
								!isDisplayRHFForm && classes.modalFormSwitcherItemActive,
							)}
						>
							Uncontrolled Form
						</button>
					</div>
					{isDisplayRHFForm ? <RHFForm /> : <UncontrolledForm />}
				</div>
			</div>
		</div>,
		document.body,
	);
};
FormsModal.displayName = "Modal";

export { FormsModal };
