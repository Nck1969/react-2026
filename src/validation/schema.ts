import { z } from "zod";

export const schema = z
	.object({
		name: z
			.string()
			.regex(/^[A-Z]/)
			.min(1)
			.max(10),
		age: z.number().min(1),
		email: z.email(),
		gender: z.string().min(1),
		isTermsAndConditionsAccepted: z.boolean(),
		image: z.file().mime(["image/png", "image/jpeg"]).max(5_000_000),
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

export type FormData = z.infer<typeof schema>;
