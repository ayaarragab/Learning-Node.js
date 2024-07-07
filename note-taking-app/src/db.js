import exp from 'node:constants';
import fs from 'node:fs/promises';
const DB_PATH = new URL('../db.json', import.meta.url).pathname

export const getDB = async () => {
    const readDB = await fs.readFile(DB_PATH, 'utf-8'); // 'utf-8' is for encoding human lang
    return JSON.parse(readDB); // takes json string and converts it into json/javascript object
} 

export const saveDB = async (DB) => {
    const data = await fs.writeFile(DB_PATH, JSON.stringify(DB, null, 2)); //  2 spaces between everything
    return data;
}

export const appendDB = async (note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}

/* The instructor will not use these functions directly in the commands.js as it still more generic and not customized for the note app use cases,
   as it will be better if we didn't put note logic here, it enhances reusibility of the files of the project, as this file db.js I can use it in
   many future project, as it is not only related to the note app
*/
