import express from "express";

import { validateZod } from "../middlewares";
import { CreateAppealSchema } from "../schemas/create-appeal.schema";
import { appealController } from "../controllers";
import { ResultAppealSchema } from "../schemas";

const router = express.Router();

router.get("/appeals", appealController.find);
router.post("/appeals", appealController.create);
router.delete("/appeals", appealController.cancelAllApplied);
router.put("/appeals/:id/apply", appealController.apply);
router.put(
	"/appeals/:id/done",
	validateZod(ResultAppealSchema),
	appealController.done
);
router.put(
	"/appeals/:id/cancel",
	validateZod(CreateAppealSchema),
	appealController.cancel
);

export default router;
