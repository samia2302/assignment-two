import type { Request, Response } from "express";
import { issueService } from "./issues.service";

const  createIssue = async(req: Request, res: Response)=>{
    try {
        
       const result = await issueService.createIssueIntoDB(req.body)
       
              res.status(201).json({
               success: true,
               message: "Issue Created Successfully",
               data: result.rows[0]
              })

    } catch (error: any) {
        res.status(500).json({
        success: false,
        message: error.message,
        error: error,
       })
    }
}

export const issueController = {
    createIssue
}