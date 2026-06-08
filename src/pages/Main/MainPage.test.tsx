import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MainPage } from "./MainPage";

describe("MainPage Component", () => {
	it("should render the 'Open Forms' button via Header", () => {
		render(<MainPage />);

		expect(
			screen.getByRole("button", { name: "Open Forms" }),
		).toBeInTheDocument();
	});

	it("shouldn't show the modal initially", () => {
		render(<MainPage />);

		expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
	});

	it("should opens the modal when 'Open Forms' button is clicked", async () => {
		const user = userEvent.setup();
		render(<MainPage />);

		await user.click(screen.getByRole("button", { name: "Open Forms" }));

		expect(screen.getByRole("presentation")).toBeInTheDocument();
	});

	it("should close the modal when 'Esc' is pressed", async () => {
		const user = userEvent.setup();
		render(<MainPage />);

		await user.click(screen.getByRole("button", { name: "Open Forms" }));
		expect(screen.getByRole("presentation")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
	});

	it("should render children inside the page content", () => {
		render(
			<MainPage>
				<span>child content</span>
			</MainPage>,
		);

		expect(screen.getByText("child content")).toBeInTheDocument();
	});
});
