import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormsModal } from "./FormsModal";

describe("FormsModal Component", () => {
	it("should render form type switcher buttons", () => {
		render(<FormsModal onClose={vi.fn()} />);

		expect(
			screen.getByRole("button", { name: "React Hook Form" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Uncontrolled Form" }),
		).toBeInTheDocument();
	});

	it("should shows RHF form fields by default", () => {
		render(<FormsModal onClose={vi.fn()} />);

		expect(screen.getByText("React Hook Form")).toHaveClass(
			/modal-form-switcher-item-active/,
		);
	});

	it("should switches to 'Uncontrolled Form' on button click", async () => {
		const user = userEvent.setup();
		render(<FormsModal onClose={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: "Uncontrolled Form" }));

		expect(screen.getByText("Uncontrolled Form")).toHaveClass(
			/modal-form-switcher-item-active/,
		);
		expect(screen.getByLabelText("Name:")).toBeInTheDocument();
		expect(screen.getByLabelText("Country:")).toBeInTheDocument();
	});

	it("should calls onClose when close button is clicked", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<FormsModal onClose={onClose} />);

		await user.click(screen.getByRole("button", { name: "X" }));

		expect(onClose).toHaveBeenCalledOnce();
	});

	it("should calls onClose when 'Esc' is pressed", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<FormsModal onClose={onClose} />);

		await user.keyboard("{Escape}");

		expect(onClose).toHaveBeenCalledOnce();
	});

	it("should calls onClose when the overlay backdrop is clicked", () => {
		const onClose = vi.fn();
		render(<FormsModal onClose={onClose} />);

		const overlay = screen.getByRole("presentation");
		fireEvent.click(overlay);

		expect(onClose).toHaveBeenCalled();
	});

	it("should doesn't call onClose when clicking inside the modal", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<FormsModal onClose={onClose} />);

		await user.click(screen.getByLabelText("Name:"));

		expect(onClose).not.toHaveBeenCalled();
	});
});
