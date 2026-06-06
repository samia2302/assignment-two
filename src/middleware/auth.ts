import type { NextFunction, Request, Response } from "express"
import sendResponse from "../utility/sendResponse";
import type { ROLES } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { pool } from "../db";
import config from "../config";

const auth = (...roles: ROLES[])=> {
    try {
        return async (req: Request, res: Response, next: NextFunction) =>{
    
            const token = req.headers.authorization
    
    if(!token){
           sendResponse(res, 
        {
        statusCode: 401,
        success: false,
        message: "unauthorized access",
        }
       )
    }

    const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decoded.email])

        const user = userData.rows[0]

    if(userData.rows.length === 0){
        sendResponse(res, 
        {
        statusCode: 404,
        success: false,
        message: "user not found",
        }
          )
    }
      
    if(roles.length && !roles.includes(user.role)){
          sendResponse(res, 
        {
        statusCode: 401,
        success: false,
        message: "forbidden",
        
       }
      )
    }  

    next();
   }
    } catch (error) {
        console.log(error)
    }
    
}

export default auth