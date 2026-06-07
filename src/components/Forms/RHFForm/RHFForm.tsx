import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import useFormStore from "../../../store/formStore.ts";
import { schema } from "../../../validation/schema.ts";
import { FieldError } from "../FieldError/FieldError.tsx";

const RHFForm = memo(() => {
	const { addSubmitData } = useFormStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit((data) => addSubmitData(data));

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="name">Name</label>
				<input {...register("name")} id="name" type="text" />
				<FieldError error={errors.name?.message} />
			</div>
			<div>
				<label htmlFor="age">Age</label>
				<input {...register("age")} id="age" type="number" />
				<FieldError error={errors.age?.message} />
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input {...register("email")} id="email" type="email" />
				<FieldError error={errors.email?.message} />
			</div>
			<div>
				<label htmlFor="gender">Gender</label>
				<select {...register("gender")} id={"gender"}>
					<option value={"male"}>Male</option>
					<option value={"female"}>Female</option>
				</select>
				<FieldError error={errors.gender?.message} />
			</div>
			<div>
				<label htmlFor="terms">Terms</label>
				<input
					{...register("isTermsAndConditionsAccepted")}
					id={"terms"}
					type={"checkbox"}
				/>
				<FieldError error={errors.isTermsAndConditionsAccepted?.message} />
			</div>
			<div>
				<label htmlFor="image">Image</label>
				<input {...register("image")} id={"image"} type={"file"} />
				<FieldError error={errors.image?.message} />
			</div>
			<div>
				<label htmlFor="country">Country</label>
				<input {...register("country")} id={"country"} type={"text"} />
				<FieldError error={errors.country?.message} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input {...register("password")} id={"password"} type={"password"} />
				<FieldError error={errors.password?.message} />
			</div>
			<div>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					{...register("confirmPassword")}
					id={"confirmPassword"}
					type={"password"}
				/>
				<FieldError error={errors.confirmPassword?.message} />
			</div>
			<button type={"submit"}>Submit</button>
		</form>
	);
});
RHFForm.displayName = "RHFForm";

export { RHFForm };
