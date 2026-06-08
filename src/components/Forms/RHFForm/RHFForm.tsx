import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { COUNTRIES } from "../../../constants/countries.ts";
import useFormStore from "../../../store/formStore.ts";
import { fileToBase64 } from "../../../utils/fileToBase64.ts";
import { schema } from "../../../validation/schema.ts";
import { PasswordStrengthIndicator } from "../../PasswordStrengthIndicator/PasswordStrengthIndicator.tsx";
import { FieldError } from "../FieldError/FieldError.tsx";
import classes from "./RHFForm.module.css";

type RHFFormProps = {
	onSubmitHandler: VoidFunction;
};

const RHFForm = memo<RHFFormProps>(({ onSubmitHandler }) => {
	const { addSubmitData } = useFormStore();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit(async (data) => {
		const imageBase64 = await fileToBase64(data.image);
		const submitData = { ...data, image: imageBase64 };

		addSubmitData(submitData);
		onSubmitHandler();
	});

	return (
		<form onSubmit={onSubmit} className={classes.form}>
			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="name">Name:</label>
					<input
						{...register("name")}
						id="name"
						type="text"
						className={classes.input}
					/>
				</div>
				<FieldError error={errors.name?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="age">Age:</label>
					<input
						{...register("age")}
						id="age"
						type="number"
						className={classes.input}
					/>
				</div>
				<FieldError error={errors.age?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="email">Email:</label>
					<input
						{...register("email")}
						id="email"
						type="email"
						className={classes.input}
					/>
				</div>
				<FieldError error={errors.email?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="gender">Gender:</label>
					<select {...register("gender")} id={"gender"}>
						<option value={"male"}>Male</option>
						<option value={"female"}>Female</option>
					</select>
				</div>
				<FieldError error={errors.gender?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="terms">Terms:</label>
					<input
						{...register("isTermsAndConditionsAccepted")}
						id={"terms"}
						type={"checkbox"}
					/>
				</div>
				<FieldError error={errors.isTermsAndConditionsAccepted?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="image">Image:</label>
					<input {...register("image")} id={"image"} type={"file"} />
				</div>
				<FieldError error={errors.image?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="country">Country:</label>
					<input
						{...register("country")}
						id={"country"}
						type={"text"}
						list="countries"
					/>
					<datalist id="countries">
						{COUNTRIES.map((country) => (
							<option key={country} value={country} />
						))}
					</datalist>
				</div>
				<FieldError error={errors.country?.message} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="password">Password:</label>
					<input
						{...register("password")}
						id={"password"}
						type={"password"}
						className={classes.input}
					/>
				</div>
				<PasswordStrengthIndicator value={watch("password")} />
			</div>

			<div className={classes.fieldset}>
				<div className={classes.fieldsetContent}>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						{...register("confirmPassword")}
						id={"confirmPassword"}
						type={"password"}
						className={classes.input}
					/>
				</div>
				<FieldError error={errors.confirmPassword?.message} />
			</div>

			<button
				type={"submit"}
				disabled={Object.keys(errors).length > 0}
				className={classes.submitButton}
			>
				Submit
			</button>
		</form>
	);
});
RHFForm.displayName = "RHFForm";

export { RHFForm };
