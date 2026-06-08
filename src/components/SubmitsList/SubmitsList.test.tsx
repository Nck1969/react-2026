import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useFormStore from "../../store/formStore";
import { SubmitsList } from "./SubmitsList";

const sampleData = {
	name: "Homelander",
	age: 25,
	email: "home.lander@gmail.com",
	gender: "male",
	isTermsAndConditionsAccepted: true,
	image: "data:image/png;base64,abc",
	country: "United States",
	password: "Password1!",
	confirmPassword: "Password1!",
};

describe("SubmitsList Component", () => {
	beforeEach(() => {
		useFormStore.getState().clearSubmitData();
	});

	it("should render empty state when there are no submits", () => {
		render(<SubmitsList />);

		expect(screen.getByText("No submits")).toBeInTheDocument();
	});

	it("should render a list item when there is a submit", () => {
		useFormStore.getState().addSubmitData(sampleData);
		render(<SubmitsList />);

		expect(screen.getByText(/home\.lander@gmail\.com/i)).toBeInTheDocument();
	});

	it("should render the image for submitted items", () => {
		useFormStore.getState().addSubmitData(sampleData);
		render(<SubmitsList />);

		const img = screen.getByRole("img", { name: "user" });

		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "data:image/png;base64,abc");
	});

	it("should render multiple items in reversed order", () => {
		useFormStore.getState().addSubmitData(sampleData);
		useFormStore.getState().addSubmitData({ ...sampleData, name: "Bob" });

		render(<SubmitsList />);

		const items = screen.getAllByRole("listitem");

		expect(items).toHaveLength(2);
		// newest is first (toReversed), so Bob is first
		expect(items[0]).toHaveTextContent("Bob");
		expect(items[1]).toHaveTextContent("Homelander");
	});

	it("should does not render the id field", () => {
		useFormStore.getState().addSubmitData(sampleData);
		render(<SubmitsList />);

		expect(screen.queryByText(/id:/i)).not.toBeInTheDocument();
	});
});
