import { Router } from "express";
import { issueController } from "./issues.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/", issueController.createIssue)

router.get("/", issueController.getAllIssues)

router.get("/:id", issueController.getSingleIssue)

router.put("/:id", issueController.updateIssue)

router.delete("/:id", auth(USER_ROLE.maintainer), issueController.deleteIssue)

export const issueRoute = router