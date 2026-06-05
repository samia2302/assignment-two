import { Router } from "express";
import { issueController } from "./issues.controller";

const router = Router();

router.post("/", issueController.createIssue)

router.get("/", issueController.getAllIssues)

export const issueRoute = router