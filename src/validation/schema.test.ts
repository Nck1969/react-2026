import { describe, expect, it } from "vitest";
import { schema } from "./schema";

const png = new File(["x"], "photo.png", { type: "image/png" });

const validInput = {
	name: "Docker",
	age: "25",
	email: "docker@gmail.com",
	gender: "male",
	isTermsAndConditionsAccepted: "on",
	image: png,
	country: "United States",
	password: "Password1!",
	confirmPassword: "Password1!",
};

describe("schema", () => {
	it("should accept valid data", () => {
		expect(schema.safeParse(validInput).success).toBe(true);
	});

	it("should coerces age string to number", () => {
		const result = schema.safeParse(validInput);

		expect(result.success && result.data.age).toBe(25);
	});

	it('should preprocess isTermsAndConditionsAccepted from "on" to true', () => {
		const result = schema.safeParse(validInput);

		expect(result.success && result.data.isTermsAndConditionsAccepted).toBe(
			true,
		);
	});

	it("should reject name not starting with uppercase", () => {
		expect(schema.safeParse({ ...validInput, name: "docker" }).success).toBe(
			false,
		);
	});

	it("should reject name longer than 10 characters", () => {
		expect(
			schema.safeParse({ ...validInput, name: "Abcdefghijk" }).success,
		).toBe(false);
	});

	it("should reject empty name", () => {
		expect(schema.safeParse({ ...validInput, name: "" }).success).toBe(false);
	});

	it("should reject age below 1", () => {
		expect(schema.safeParse({ ...validInput, age: "0" }).success).toBe(false);
	});

	it("should reject invalid email", () => {
		expect(
			schema.safeParse({ ...validInput, email: "not-an-email" }).success,
		).toBe(false);
	});

	it("should reject password without uppercase", () => {
		expect(
			schema.safeParse({
				...validInput,
				password: "password1!",
				confirmPassword: "password1!",
			}).success,
		).toBe(false);
	});

	it("should reject password without digit", () => {
		expect(
			schema.safeParse({
				...validInput,
				password: "Password!",
				confirmPassword: "Password!",
			}).success,
		).toBe(false);
	});

	it("should reject password shorter than 8 characters", () => {
		expect(
			schema.safeParse({
				...validInput,
				password: "Pa1!",
				confirmPassword: "Pa1!",
			}).success,
		).toBe(false);
	});

	it("should reject mismatched passwords", () => {
		expect(
			schema.safeParse({ ...validInput, confirmPassword: "Different1!" })
				.success,
		).toBe(false);
	});

	it("should reject non-image file", () => {
		const txt = new File(["x"], "file.txt", { type: "text/plain" });
		expect(schema.safeParse({ ...validInput, image: txt }).success).toBe(false);
	});

	it("should accept jpeg image", () => {
		const jpg = new File(["x"], "photo.jpg", { type: "image/jpeg" });
		expect(schema.safeParse({ ...validInput, image: jpg }).success).toBe(true);
	});

	it("should accept webp image", () => {
		const webp = new File(["x"], "photo.webp", { type: "image/webp" });
		expect(schema.safeParse({ ...validInput, image: webp }).success).toBe(true);
	});

	it("should reject empty country", () => {
		expect(schema.safeParse({ ...validInput, country: "" }).success).toBe(
			false,
		);
	});
});
