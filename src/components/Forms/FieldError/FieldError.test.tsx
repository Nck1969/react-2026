import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldError } from "./FieldError";

describe("FieldError Component", () => {
	it("should render the error message", () => {
		render(<FieldError error="This field is required" />);
		expect(screen.getByText("This field is required")).toBeInTheDocument();
	});

	it("shouldn't render anything when error is undefined", () => {
		const { container } = render(<FieldError error={undefined} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("shouldn't render anything when error is empty string", () => {
		const { container } = render(<FieldError error="" />);
		expect(container).toBeEmptyDOMElement();
	});
});
