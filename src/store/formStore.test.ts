import { beforeEach, describe, expect, it } from "vitest";
import useFormStore from "./formStore";

const sampleData = {
	name: "Peter",
	age: 25,
	email: "peter.testo@gmail.com",
	gender: "male",
	isTermsAndConditionsAccepted: true,
	image: "data:image/png;base64,abc",
	country: "United States",
	password: "Password1!",
	confirmPassword: "Password1!",
};

describe("formStore", () => {
	beforeEach(() => {
		useFormStore.getState().clearSubmitData();
	});

	it("should initializes store with empty submits list", () => {
		expect(useFormStore.getState().submits).toEqual([]);
	});

	it("should 'addSubmitData' method appends an entry with a generated id", () => {
		useFormStore.getState().addSubmitData(sampleData);

		const { submits } = useFormStore.getState();

		expect(submits).toHaveLength(1);
		expect(submits[0].name).toBe("Peter");
		expect(submits[0].id).toBeDefined();
	});

	it("should 'addSubmitData' method preserves previous entries", () => {
		useFormStore.getState().addSubmitData(sampleData);
		useFormStore
			.getState()
			.addSubmitData({ ...sampleData, name: "Homelander" });

		const { submits } = useFormStore.getState();

		expect(submits).toHaveLength(2);
		expect(submits[0].name).toBe("Peter");
		expect(submits[1].name).toBe("Homelander");
	});

	it("should 'clearSubmitData' method empties the submits list", () => {
		useFormStore.getState().addSubmitData(sampleData);
		useFormStore.getState().clearSubmitData();

		expect(useFormStore.getState().submits).toEqual([]);
	});

	it("should stored entry contains all submitted fields", () => {
		useFormStore.getState().addSubmitData(sampleData);

		const entry = useFormStore.getState().submits[0];

		expect(entry.email).toBe("peter.testo@gmail.com");
		expect(entry.image).toBe("data:image/png;base64,abc");
		expect(entry.country).toBe("United States");
	});
});
