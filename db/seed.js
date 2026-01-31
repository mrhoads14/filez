import db from "#db/client";
import { getFolders, createFolder, getFolderIdByName, getFolderById } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 3; i++) {
    await createFolder(`folder ${i}`);
    for (let j = 0; j < 5; j++) {
      const folderId = await getFolderIdByName(`folder ${i}`);
      await createFile({ name: `file ${i}_${j}`, size: i * j, folderId: folderId });
    }
  }
  const folders = await getFolders();
  console.log('in seed, here are the folders at bottom: ', folders);
  
  const x = await getFolderById(3);
  console.log('here is x again: ', x);
  console.log('and again ', JSON.stringify(x, null, 2));
  
}
