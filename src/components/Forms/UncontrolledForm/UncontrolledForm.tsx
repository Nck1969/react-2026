import { memo, type SubmitEvent, useState } from "react";
import { z } from "zod";
import { COUNTRIES } from "../../../constants/countries.ts";
import useFormStore from "../../../store/formStore.ts";
import type { FormErrors } from "../../../types/formErrors.ts";
import { fileToBase64 } from "../../../utils/fileToBase64.ts";
import { schema } from "../../../validation/schema.ts";
import { PasswordStrengthIndicator } from "../../PasswordStrengthIndicator/PasswordStrengthIndicator.tsx";
import { UncontrolledFormFieldError } from "../FieldError/UncontrolledFormFieldError.tsx";
import classes from "../RHFForm/RHFForm.module.css";

type UncontrolledFormProps = {
	onSubmitHandler: VoidFunction;
};

const UncontrolledForm = memo<UncontrolledFormProps>(({ onSubmitHandler }) => {
	const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
	const { addSubmitData } = useFormStore();
	const [password, setPassword] = useState("");

	const handleSubmit = async (submitEvent: SubmitEvent<HTMLFormElement>) => {
		submitEvent.preventDefault();

		const formData = new FormData(submitEvent.currentTarget);
		const data = Object.fromEntries(formData);

		const validationResult = schema.safeParse(data);

		if (validationResult.success) {
			const imageBase64 = await fileToBase64(validationResult.data.image);
			const submitData = { ...validationResult.data, image: imageBase64 };

			addSubmitData(submitData);
			onSubmitHandler();
		} else {
			const errors = z.treeifyError(validationResult.error);

			setFormErrors(errors);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="name">Name:</label>
					<input id="name" name="name" type="text" className={classes.input} />
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"name"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="age">Age:</label>
					<input id="age" name="age" type="number" className={classes.input} />
				</div>
				<UncontrolledFormFieldError formErrors={formErrors} fieldName={"age"} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						name="email"
						type="email"
						className={classes.input}
					/>
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"email"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="gender">Gender:</label>
					<select id={"gender"} name={"gender"}>
						<option value={"male"}>Male</option>
						<option value={"female"}>Female</option>
					</select>
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"gender"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="terms">Terms:</label>
					<input id={"terms"} name={"terms"} type={"checkbox"} />
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"isTermsAndConditionsAccepted"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="image">Image:</label>
					<input id={"image"} name={"image"} type={"file"} />
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"image"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="country">Country:</label>
					<input
						id={"country"}
						name={"country"}
						type={"text"}
						list={"countries"}
					/>
					<datalist id="countries">
						{COUNTRIES.map((country) => (
							<option key={country} value={country} />
						))}
					</datalist>
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"country"}
				/>
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="password">Password:</label>
					<input
						id={"password"}
						name={"password"}
						className={classes.input}
						type={"password"}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<PasswordStrengthIndicator value={password} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						id={"confirmPassword"}
						name={"confirmPassword"}
						type={"password"}
						className={classes.input}
					/>
				</div>
				<UncontrolledFormFieldError
					formErrors={formErrors}
					fieldName={"confirmPassword"}
				/>
			</div>

			<button type={"submit"} className={classes.submitButton}>
				Submit
			</button>
		</form>
	);
});
UncontrolledForm.displayName = "UncontrolledForm";

export { UncontrolledForm };
