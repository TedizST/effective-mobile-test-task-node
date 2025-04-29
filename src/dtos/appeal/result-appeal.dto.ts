import { z } from "zod";
import { ResultAppealSchema } from "../../schemas";

export type TResultAppealDTO = z.infer<typeof ResultAppealSchema>;
