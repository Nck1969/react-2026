import { z } from "zod";
import type { schema } from "../validation/schema.ts";

export type FormErrors = ReturnType<
	typeof z.treeifyError<z.infer<typeof schema>>
>;
