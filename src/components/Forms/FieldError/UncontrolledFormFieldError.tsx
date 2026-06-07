import { memo } from "react";
import type { FormErrors } from "../../../types/formErrors.ts";
import { FieldError } from "./FieldError.tsx";

type UncontrolledFormFieldErrorProps = {
	fieldName: keyof NonNullable<FormErrors["properties"]>;
	formErrors: FormErrors | null;
};

const UncontrolledFormFieldError = memo<UncontrolledFormFieldErrorProps>(
	({ fieldName, formErrors }) => {
		const errors = formErrors?.properties?.[fieldName]?.errors;

		if (!errors) {
			return null;
		}

		const errorMessage = errors.join(". ");

		return <FieldError error={errorMessage} />;
	},
);
UncontrolledFormFieldError.displayName = "UncontrolledFormFieldError";

export { UncontrolledFormFieldError };
