import { memo } from "react";

type FieldErrorProps = {
	error: string | undefined;
};

const FieldError = memo<FieldErrorProps>(({ error }) => {
	if (!error) {
		return null;
	}

	return <span>{error}</span>;
});
FieldError.displayName = "FieldError";

export { FieldError };
