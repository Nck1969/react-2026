import { z } from "zod";

export const schema = z
	.object({
		name: z
			.string()
			.regex(/^[A-Z]/)
			.min(1)
			.max(10),
		age: z.coerce.number().min(1),
		email: z.email(),
		gender: z.string().min(1),
		isTermsAndConditionsAccepted: z.preprocess(
			(val: string) => val === "on",
			z.boolean(),
		),
		image: z.preprocess(
			(value: FileList | File) => {
				return value instanceof FileList ? value.item(0) : value;
			},
			z.file().mime(["image/png", "image/jpeg", "image/webp"]).max(5_000_000),
		),
		country: z.string().min(1),
		password: z
			.string()
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
			),
		confirmPassword: z.string().min(1),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SubmitData = z.infer<typeof schema>;
