import express from "express";
import * as TagsController from "../controllers/tagsController.js";

const router = express.Router();

router.get("/", TagsController.getAll);
router.get("/last5", TagsController.getLastTags);


export { router as tagsRoutes };
