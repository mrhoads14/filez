import db from "#db/client";
import { createFolder, getFolderIdByName } from "./queries/folders.js";
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
  
}
