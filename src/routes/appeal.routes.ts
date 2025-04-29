import express from "express";

import { validateZod } from "../middlewares";
import { CreateAppealSchema } from "../schemas/create-appeal.schema";
import { appealController } from "../controllers";
import { ResultAppealSchema } from "../schemas";

const router = express.Router();

router.delete(
	"/appeals/:id",
	validateZod(CreateAppealSchema),
	appealController.cancel
);
router.put("/appeals/:id/apply", appealController.apply);
router.put(
	"/appeals/:id/done",
	validateZod(ResultAppealSchema),
	appealController.done
);
router.post("/appeals", appealController.create);
router.get("/appeals", appealController.find);
router.delete("/appeals", appealController.cancelAllApplied);

export default router;
