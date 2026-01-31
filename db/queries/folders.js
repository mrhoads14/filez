import db from "../client.js";


export const createFolder = async (name) => {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;
  const { rows: [folder] } = await db.query(sql, [name]);
  return folder;
}

export const getFolderIdByName = async (name) => {
  const sql = `
    SELECT id FROM folders
    WHERE folders.name = $1;
  `;
  const { rows: [folder] } = await db.query(sql, [name]);
  return folder.id;
}
