import { memo } from "react";
import classes from "./Header.module.css";

type HeaderProps = {
	openFormHandler: VoidFunction;
};

const Header = memo<HeaderProps>(({ openFormHandler }) => {
	return (
		<header className={classes.header}>
			<button
				type={"button"}
				onClick={openFormHandler}
				className={classes.openModalButton}
			>
				Open Forms
			</button>
		</header>
	);
});
Header.displayName = "Header";

export { Header };
