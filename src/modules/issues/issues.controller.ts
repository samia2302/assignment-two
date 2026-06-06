import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";

const  createIssue = async(req: Request, res: Response)=>{
    try {
        
       const result = await issueService.createIssueIntoDB(req.body)

     sendResponse(res, 
        {
        statusCode: 201,
        success: true,
        message: "Issue Created Successfully",
        data: result.rows[0]
       }
      )

    } catch (error: any) {
        sendResponse(res, 
        {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
       }
      )
    }
};


const getAllIssues = async(req: Request, res: Response)=>{
     try {
        
       const result = await issueService.getAllIssuesFromDB()

        sendResponse(res, 
        {
        statusCode: 200,
        success: true,
        message: "Issues retrived successfully",
        data: result.rows[0]
       }
      )

    } catch (error: any) {
        sendResponse(res, 
        {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
       }
      )
    }
};


const getSingleIssue = async(req: Request,res: Response)=>{

    const {id} = req.params;

    try {

        const result = await issueService.getSingleIssueFromDB(id as string);

        sendResponse(res, 
        {
        statusCode: 200,
        success: true,
        message: "Issues retrived successfully",
        data: result
       }
      )

    } catch (error: any) {

        sendResponse(res, 
        {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
       }
      )

    }

};


const updateIssue = async(req: Request,res: Response)=>{
    const {id} = req.params;

     try {
        const result = await issueService.updateIssueIntoDB(req.body, id as string)

        sendResponse(res, 
        {
        statusCode: 200,
        success: true,
        message: "Issue updated successfully",
        data: result.rows[0]
       }
      )

     } catch (error: any) {
        sendResponse(res, 
        {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
       }
      )
     }
};


const deleteIssue = async(req: Request,res: Response)=>{

    const {id} = req.params;

    try {

        await issueService.deleteIssueFromDB(id as string);

        sendResponse(res, 
        {
        statusCode: 200,
        success: true,
        message: "Issue deleted successfully"
       }
      )

    } catch (error: any) {

        sendResponse(res, 
        {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
       }
      )

    }

};




export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
}