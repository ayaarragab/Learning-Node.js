#!/usr/bin/env node
import { writeFile } from 'fs/promises';
// import { readFile } from 'fs/promises'
import { URL } from 'url'

// const currentDir = async () => {
//     //In node we can only read absolute paths that's why we do that
//     const absolutePath = new URL('../package.json', import.meta.url).pathname;
//     console.log(JSON.parse(await readFile(absolutePath, 'utf-8')));
// }
// currentDir();

const createAfile = async () => {
    const path = new URL('hello.js', import.meta.url).pathname;
    await writeFile(path, `console.log("Hellooo");`);
}
createAfile();
console.log(import.meta.url); // file:///root/Learning-Node.js/note-taking-app/notes/files.js
