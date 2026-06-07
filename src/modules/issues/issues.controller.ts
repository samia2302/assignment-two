import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";

const  createIssue = async(req: Request, res: Response)=>{
    try {
        
       const result = await issueService.createIssueIntoDB(req.body, req.user!.id)

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
        
      const { sort = "newest", type, status } = req.query;

       const result = await issueService.getAllIssuesFromDB(sort as string, type as string,status as string)

        sendResponse(res, 
        {
        statusCode: 200,
        success: true,
        message: "Issues retrieved successfully",
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


const getSingleIssue = async(req: Request,res: Response)=>{

    const {id} = req.params;

    try {

      const result = await issueService.getSingleIssueFromDB(id as string);

if (!result) {
  return sendResponse(res, {
    statusCode: 404,
    success: false,
    message: "Issue not found"
  });
}

sendResponse(res, {
  statusCode: 200,
  success: true,
  message: "Issue retrieved successfully",
  data: result
});

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

const issueResult = await issueService.getSingleIssueFromDB(id as string);

    if (!issueResult) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
      });
    }

    const issue = issueResult;
    const user = req.user!;

    if (user.role !== "maintainer") {
      
      if (issue.reporter_id !== user.id) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "You can only update your own issue",
        });
      }

      if (issue.status !== "open") {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "You can only update open issues",
        });
      }
    }


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