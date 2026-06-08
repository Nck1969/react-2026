import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

describe("Header Component", () => {
	it("should render the 'Open Forms' button", () => {
		render(<Header openFormHandler={vi.fn()} />);

		expect(
			screen.getByRole("button", { name: "Open Forms" }),
		).toBeInTheDocument();
	});

	it("should calls 'openFormHandler' when button is clicked", async () => {
		const user = userEvent.setup();
		const openFormHandler = vi.fn();
		render(<Header openFormHandler={openFormHandler} />);

		await user.click(screen.getByRole("button", { name: "Open Forms" }));

		expect(openFormHandler).toHaveBeenCalledOnce();
	});
});
