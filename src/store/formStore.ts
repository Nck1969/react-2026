import { create } from "zustand";
import type { SubmitData } from "../validation/schema.ts";

type StoreSubmitData = Omit<SubmitData, "image"> & {
	id: string;
	image: Base64URLString;
};

type SubmitDataWithBase64 = Omit<SubmitData, "image"> & { image: string };

type FormStore = {
	submits: StoreSubmitData[];
	addSubmitData: (data: SubmitDataWithBase64) => void;
	clearSubmitData: VoidFunction;
};

const useFormStore = create<FormStore>((set) => ({
	submits: [],
	addSubmitData: (submitData) =>
		set((state) => {
			const storedData: StoreSubmitData = {
				...submitData,
				id: Date.now().toString(),
			};

			return { submits: [...state.submits, storedData] };
		}),
	clearSubmitData: () => set(() => ({ submits: [] })),
}));

export default useFormStore;

export type { StoreSubmitData };
