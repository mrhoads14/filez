import db from "../client.js";


export const createFile = async ({ name, size, folderId }) => {
  const sql = `
  INSERT INTO files (name, size, folder_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  try {
    const { rows: [file] } = await db.query(sql, [name, size, folderId]);
    return file;
  } catch (err) {
    console.error('error in createFile', err);
    throw err;
  }
}

export const readFiles = async () => {
  const sql = `
  SELECT files.*, folders.name AS folder_name FROM files
  JOIN folders ON files.folder_id = folders.id;
  `;
  try {
    const { rows: files } = await db.query(sql);
    return files;
  } catch (err) {
    console.error('error in db/files: readFiles', err);
    throw err;
  }
  
}
