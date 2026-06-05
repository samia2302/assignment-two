import { pool } from "../../db";

const createIssueIntoDB = async(payload: any)=>{
    const {title,description,type} = payload;

const result = await pool.query(`
    INSERT INTO issues(title,description,type) VALUES($1,$2,$3) RETURNING *
    `,[title,description,type]);
    return result;

};


const getAllIssuesFromDB = async()=>{
    const result = await pool.query(`
        SELECT * FROM issues
        `);
        return result;
}




export const issueService ={
    createIssueIntoDB,
    getAllIssuesFromDB
}