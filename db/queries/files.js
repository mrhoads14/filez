import db from "../client.js";


export const createFile = async ({ name, size, folderId }) => {
  const sql = `
  INSERT INTO files (name, size, folder_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const { rows: [file] } = await db.query(sql, [name, size, folderId]);
  return file;
}
