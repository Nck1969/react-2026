import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RHFForm } from "./RHFForm";

vi.mock("../../../utils/fileToBase64", () => ({
	fileToBase64: vi.fn().mockResolvedValue("data:image/png;base64,abc123"),
}));

const mockAddSubmitData = vi.hoisted(() => vi.fn());
vi.mock("../../../store/formStore", () => ({
	default: vi.fn(() => ({ addSubmitData: mockAddSubmitData })),
}));

describe("RHFForm Component", () => {
	it("should render all form fields", () => {
		render(<RHFForm onSubmitHandler={vi.fn()} />);

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

	it("should submit button to be initially enabled", () => {
		render(<RHFForm onSubmitHandler={vi.fn()} />);

		expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
	});

	it("should disable submit button after empty form submission", async () => {
		const user = userEvent.setup();
		render(<RHFForm onSubmitHandler={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
		});
	});

	it("shouldn't call 'onSubmitHandler' on empty submission", async () => {
		const user = userEvent.setup();
		const onSubmitHandler = vi.fn();
		render(<RHFForm onSubmitHandler={onSubmitHandler} />);

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
		});
		expect(onSubmitHandler).not.toHaveBeenCalled();
	});

	it("should calls 'onSubmitHandler' on valid submission", async () => {
		const user = userEvent.setup();
		const onSubmitHandler = vi.fn();
		render(<RHFForm onSubmitHandler={onSubmitHandler} />);

		await user.type(screen.getByLabelText("Name:"), "Alice");
		await user.type(screen.getByLabelText("Age:"), "25");
		await user.type(screen.getByLabelText("Email:"), "alice@example.com");
		await user.click(screen.getByLabelText("Terms:"));
		await user.upload(
			screen.getByLabelText("Image:"),
			new File(["x"], "photo.png", { type: "image/png" }),
		);
		await user.type(screen.getByLabelText("Country:"), "United States");
		await user.type(screen.getByLabelText("Password:"), "Password1!");
		await user.type(screen.getByLabelText("Confirm Password:"), "Password1!");

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(onSubmitHandler).toHaveBeenCalledOnce();
		});
	});

	it("should calls 'addSubmitData' with the submitted data", async () => {
		const user = userEvent.setup();
		mockAddSubmitData.mockClear();
		render(<RHFForm onSubmitHandler={vi.fn()} />);

		await user.type(screen.getByLabelText("Name:"), "Alice");
		await user.type(screen.getByLabelText("Age:"), "25");
		await user.type(screen.getByLabelText("Email:"), "alice@example.com");
		await user.click(screen.getByLabelText("Terms:"));
		await user.upload(
			screen.getByLabelText("Image:"),
			new File(["x"], "photo.png", { type: "image/png" }),
		);
		await user.type(screen.getByLabelText("Country:"), "United States");
		await user.type(screen.getByLabelText("Password:"), "Password1!");
		await user.type(screen.getByLabelText("Confirm Password:"), "Password1!");

		await user.click(screen.getByRole("button", { name: "Submit" }));

		await waitFor(() => {
			expect(mockAddSubmitData).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "Alice",
					email: "alice@example.com",
					image: "data:image/png;base64,abc123",
				}),
			);
		});
	});
});
