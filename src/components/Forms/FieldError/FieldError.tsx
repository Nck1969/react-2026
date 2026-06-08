import { memo } from "react";
import classes from "./FieldError.module.css";

type FieldErrorProps = {
	error: string | undefined;
};

const FieldError = memo<FieldErrorProps>(({ error }) => {
	if (error == null || error === "") {
		return null;
	}

	return <span className={classes.error}>{error}</span>;
});
FieldError.displayName = "FieldError";

export { FieldError };
