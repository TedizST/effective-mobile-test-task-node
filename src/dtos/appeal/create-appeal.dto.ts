import { z } from "zod";
import { CreateAppealSchema } from "../../schemas";

export type TCreateAppealDTO = z.infer<typeof CreateAppealSchema>;
