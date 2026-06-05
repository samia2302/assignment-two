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
};


const getSingleIssueFromDB = async(id: string)=>{
    const result = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `,[id]);
        return result;
}




export const issueService ={
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB
}