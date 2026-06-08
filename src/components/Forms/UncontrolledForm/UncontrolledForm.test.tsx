import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UncontrolledForm } from "./UncontrolledForm";

vi.mock("../../../utils/fileToBase64", () => ({
	fileToBase64: vi.fn().mockResolvedValue("data:image/png;base64,abc123"),
}));

const mockAddSubmitData = vi.hoisted(() => vi.fn());
vi.mock("../../../store/formStore", () => ({
	default: vi.fn(() => ({ addSubmitData: mockAddSubmitData })),
}));

const mockSafeParse = vi.hoisted(() => vi.fn());
vi.mock("../../../validation/schema", async (importOriginal) => {
	const original =
		await importOriginal<typeof import("../../../validation/schema")>();
	mockSafeParse.mockImplementation((data: unknown) =>
		original.schema.safeParse(data),
	);
	return { schema: { safeParse: mockSafeParse } };
});

const VALID_SUBMIT_DATA = {
	name: "Eren",
	age: 25,
	email: "eren@gmail.com",
	gender: "male",
	isTermsAndConditionsAccepted: true,
	image: new File(["x"], "photo.png", { type: "image/png" }),
	country: "United States",
	password: "Password1!",
	confirmPassword: "Password1!",
};

describe("UncontrolledForm Coponent", () => {
	it("should renders all form fields", () => {
		render(<UncontrolledForm onSubmitHandler={vi.fn()} />);

		expect(screen.getByLabelText("Name:")).toBeInTheDocument();
		expect(screen.getByLabelText("Age:")).toBeInTheDocument();
		expect(screen.getByLabelText("Email:")).toBeInTheDocument();
		expect(screen.getByLabelText("Gender:")).toBeInTheDocument();
		expect(screen.getByLabelText("Terms:")).toBeInTheDocument();
		expect(screen.getByLabelText("Image:")).toBeInTheDocument();
		expect(screen.getByLabelText("Country:")).toBeInTheDocument();
		expect(screen.getByLabelText("Password:")).toBeInTheDocument();
		expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
	});

	it("shouldn't call 'onSubmitHandler' on empty submission", async () => {
		const user = userEvent.setup();
		const onSubmitHandler = vi.fn();
		render(<UncontrolledForm onSubmitHandler={onSubmitHandler} />);

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(onSubmitHandler).not.toHaveBeenCalled();
		});
	});

	it("should keeps form visible after invalid submission", async () => {
		const user = userEvent.setup();
		render(<UncontrolledForm onSubmitHandler={vi.fn()} />);

		await user.type(screen.getByLabelText("Name:"), "alice"); // lowercase — invalid
		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Submit" }),
			).toBeInTheDocument();
		});
	});

	it("should calls 'onSubmitHandler' on valid submission", async () => {
		const user = userEvent.setup();
		const onSubmitHandler = vi.fn();
		mockSafeParse.mockReturnValueOnce({
			success: true,
			data: VALID_SUBMIT_DATA,
		});
		render(<UncontrolledForm onSubmitHandler={onSubmitHandler} />);

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(onSubmitHandler).toHaveBeenCalledOnce();
		});
	});

	it("should calls 'addSubmitData' with the submitted data", async () => {
		const user = userEvent.setup();
		mockAddSubmitData.mockClear();
		mockSafeParse.mockReturnValueOnce({
			success: true,
			data: VALID_SUBMIT_DATA,
		});
		render(<UncontrolledForm onSubmitHandler={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(mockAddSubmitData).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "Eren",
					email: "eren@gmail.com",
					image: "data:image/png;base64,abc123",
				}),
			);
		});
	});
});
