import { existsSync } from 'node:fs';
import {  readFile  } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const read = async () => {
    // Write your code here

    const folderWithFilesName = 'files'
    const fileToReadName = 'fileToRead.txt'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const fileToReadPath = join(__dirname, folderWithFilesName, fileToReadName)
    const folderWithFilesPath = join(__dirname, folderWithFilesName)
    const options = {
        encoding: 'utf8'
    }

    if (!existsSync(folderWithFilesPath) || !existsSync(fileToReadPath)) {
        throw new Error('FS operation failed');
    }

    try {
        const fileData = await readFile (fileToReadPath, options);
        console.log(fileData)
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await read();
