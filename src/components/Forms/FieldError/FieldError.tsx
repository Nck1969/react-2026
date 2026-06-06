import { memo } from "react";
import type { FormErrors } from "../../../types/formErrors.ts";

type FieldErrorProps = {
	fieldName: keyof NonNullable<FormErrors["properties"]>;
	formErrors: FormErrors | null;
};

const FieldError = memo<FieldErrorProps>(({ fieldName, formErrors }) => {
	const errors = formErrors?.properties?.[fieldName]?.errors;

	if (!errors) {
		return null;
	}

	const errorMessage = errors.join(". ");

	return <span>{errorMessage}</span>;
});
FieldError.displayName = "FieldError";

export { FieldError };
