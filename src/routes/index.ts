import express from "express";

import appealRouter from "./appeal.routes";

const router = express.Router();

router.use("/api", appealRouter);

export default router;
