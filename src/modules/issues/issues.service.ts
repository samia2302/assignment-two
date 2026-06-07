import { pool } from "../../db";
import type { IIssue } from "./issues.interface";

const createIssueIntoDB = async(payload: IIssue, reporterId: number)=>{
    const {title,description,type} = payload;

const result = await pool.query(`
    INSERT INTO issues(title,description,type, reporter_id) VALUES($1,$2,$3,$4) RETURNING *
    `,[title,description,type,reporterId]);
    return result;

};


const getAllIssuesFromDB = async (
  sort = "newest",type?: string,status?: string) => {

  let query = `SELECT * FROM issues WHERE 1=1`;

  const values: (string | number)[] = [];
  let i = 1;

  if (type) {
    query += ` AND type = $${i}`;
    values.push(type);
    i++;
  }

  if (status) {
    query += ` AND status = $${i}`;
    values.push(status);
    i++;
  }

  query += sort === "oldest" ? ` ORDER BY created_at ASC` : ` ORDER BY created_at DESC`;

  const issuesResult = await pool.query(query, values);

  const issues = issuesResult.rows;

  const reporterIds = [...new Set(issues.map(i => i.reporter_id))];

  const usersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds]
  );

  const usersMap = new Map(usersResult.rows.map(u => [u.id, u]));

  return issues.map(issue => ({
    ...issue,
    reporter: usersMap.get(issue.reporter_id) || null
  }));
};


const getSingleIssueFromDB = async(id: string)=>{

    const issueResult = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `,[id]);

    if (!issueResult.rows.length) {
    return null;
    }

    const issue = issueResult.rows[0];

    const userResult = await pool.query(`
        SELECT id,name,role
        FROM users
        WHERE id=$1
        `,[issue.reporter_id]);

    return {
        ...issue,
        reporter: userResult.rows[0] || null
           };
};


const updateIssueIntoDB = async(payload: IIssue, id:string)=>{
    const {title,description,type,status} = payload;

    const result = await pool.query(`
        UPDATE issues
        SET
        title = COALESCE($1,title),
        description = COALESCE($2,description),
        type = COALESCE($3,type),
        status = COALESCE($4,status),
        updated_at = NOW()
        WHERE id=$5
        RETURNING *
    `,[title,description,type,status,id]);

    return result;
};


const deleteIssueFromDB = async(id: string)=>{
    const result = await pool.query(`
        DELETE FROM issues WHERE id=$1
        `,[id]);
        return result;
}




export const issueService ={
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB
}