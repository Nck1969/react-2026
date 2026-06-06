import { create } from "zustand";
import type { SubmitData } from "../validation/schema.ts";

type FormStore = {
	submits: SubmitData[];
	addSubmitData: (data: SubmitData) => void;
	clearSubmitData: VoidFunction;
};

const useFormStore = create<FormStore>((set) => ({
	submits: [],
	addSubmitData: (submitData) =>
		set((state) => ({ submits: [...state.submits, submitData] })),
	clearSubmitData: () => set(() => ({ submits: [] })),
}));

export default useFormStore;
