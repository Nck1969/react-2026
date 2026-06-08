import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

describe("PasswordStrengthIndicator Component", () => {
	it("should render all five requirement labels", () => {
		render(<PasswordStrengthIndicator value="" />);

		expect(screen.getByText("Min 8 characters")).toBeInTheDocument();
		expect(screen.getByText("1 Uppercase character")).toBeInTheDocument();
		expect(screen.getByText("1 Lowercase character")).toBeInTheDocument();
		expect(screen.getByText("1 Digit")).toBeInTheDocument();
		expect(screen.getByText("1 Special Character")).toBeInTheDocument();
	});

	it("should all checks to be passed with a strong password", () => {
		const { container } = render(
			<PasswordStrengthIndicator value="Password1!" />,
		);

		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(5);
	});

	it("should verify that all check works as expected", () => {
		const { container, rerender } = render(
			<PasswordStrengthIndicator value="" />,
		);

		expect(
			Array.from(container.querySelectorAll('[class*="indicator-red"]')),
		).toHaveLength(5);

		rerender(<PasswordStrengthIndicator value="pass" />);

		expect(
			Array.from(container.querySelectorAll('[class*="indicator-red"]')),
		).toHaveLength(4);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(1);

		rerender(<PasswordStrengthIndicator value="Pass" />);

		expect(
			Array.from(container.querySelectorAll('[class*="indicator-red"]')),
		).toHaveLength(3);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(2);

		rerender(<PasswordStrengthIndicator value="Password" />);

		expect(
			Array.from(container.querySelectorAll('[class*="indicator-red"]')),
		).toHaveLength(2);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(3);

		rerender(<PasswordStrengthIndicator value="Password1" />);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-red"]')),
		).toHaveLength(1);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(4);

		rerender(<PasswordStrengthIndicator value="Password1!" />);
		expect(
			Array.from(container.querySelectorAll('[class*="indicator-green"]')),
		).toHaveLength(5);
	});
});
