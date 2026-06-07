import { memo, type SubmitEvent, useState } from "react";
import { z } from "zod";
import useFormStore from "../../../store/formStore.ts";
import type { FormErrors } from "../../../types/formErrors.ts";
import { schema } from "../../../validation/schema.ts";
import { UncontrolledFormFieldError } from "../FieldError/UncontrolledFormFieldError.tsx";

const UncontrolledForm = memo(() => {
	const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
	const { addSubmitData } = useFormStore();

	const handleSubmit = async (submitEvent: SubmitEvent<HTMLFormElement>) => {
		submitEvent.preventDefault();

		const formData = new FormData(submitEvent.currentTarget);
		const data = Object.fromEntries(formData);

		const validationResult = schema.safeParse(data);

		if (validationResult.success) {
			addSubmitData(validationResult.data);

			setFormErrors(null);
		} else {
			const errors = z.treeifyError(validationResult.error);

			setFormErrors(errors);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name</label>
				<input id="name" name="name" type="text" />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"name"}
				/>
			</div>
			<div>
				<label htmlFor="age">Age</label>
				<input id="age" name="age" type="number" />
				<UncontrolledFormFieldError formErrors={formErrors} fieldName={"age"} />
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="email" />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"email"}
				/>
			</div>
			<div>
				<label htmlFor="gender">Gender</label>
				<select id={"gender"} name={"gender"}>
					<option value={"male"}>Male</option>
					<option value={"female"}>Female</option>
				</select>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"gender"}
				/>
			</div>
			<div>
				<label htmlFor="terms">Terms</label>
				<input id={"terms"} name={"terms"} type={"checkbox"} />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"isTermsAndConditionsAccepted"}
				/>
			</div>
			<div>
				<label htmlFor="image">Image</label>
				<input id={"image"} name={"image"} type={"file"} />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"image"}
				/>
			</div>
			<div>
				<label htmlFor="country">Country</label>
				<input id={"country"} name={"country"} type={"text"} />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"country"}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input id={"password"} name={"password"} type={"password"} />
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"password"}
				/>
			</div>
			<div>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					id={"confirmPassword"}
					name={"confirmPassword"}
					type={"password"}
				/>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"confirmPassword"}
				/>
			</div>
			<button type={"submit"}>Submit</button>
		</form>
	);
});
UncontrolledForm.displayName = "UncontrolledForm";

export { UncontrolledForm };
