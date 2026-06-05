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
};


const getAllIssues = async(req: Request, res: Response)=>{
     try {
        
       const result = await issueService.getAllIssuesFromDB()
       
              res.status(200).json({
               success: true,
               message: "Issues retrived successfully",
               data: result.rows[0]
              })

    } catch (error: any) {
        res.status(500).json({
        success: false,
        message: error.message,
        error: error,
       })
    }
};


const getSingleIssue = async(req: Request,res: Response)=>{

    const {id} = req.params;

    try {

        const result = await issueService.getSingleIssueFromDB(id as string);

        res.status(200).json({
            success: true,
            message: "Issue retrived successfully",
            data: result
        })

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message,
            errors: error
        })

    }

};





export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue
}