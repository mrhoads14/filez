import db from "../client.js";


export const createFolder = async (name) => {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;
  try {
    const { rows: [folder] } = await db.query(sql, [name]);
    return folder;
  } catch (err) {
    console.error('error in db/folders.js createFolder: ', err);
    throw err;
  }
}

export const getFolderIdByName = async (name) => {
  const sql = `
    SELECT id FROM folders
    WHERE folders.name = $1;
  `;
  const { rows: [folder] } = await db.query(sql, [name]);
  return folder.id;
}

export const getFolders = async () => {
  const sql = `
    SELECT * FROM folders;
  `;
  try {
    const { rows: folders } = await db.query(sql);
    return folders;
  } catch (err) {
    console.error('getFolders error: ', err);
    throw err;
  }
}

export const getFolderById = async (id) => {
  const sql = `
  SELECT 
  folders.*,
    (
      SELECT json_agg(files)
      FROM files
      WHERE files.folder_id = folders.id
    ) AS files
  FROM folders
  WHERE folders.id = $1;
  `;
  try {
    const { rows: [folder] } = await db.query(sql, [id]);
    return folder;
  } catch (err) {
    console.error('getFolderById error: ', err);
    throw err;
  }
}
