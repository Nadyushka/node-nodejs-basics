import { existsSync } from 'node:fs';
import {  readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const list = async () => {
    // Write your code here

    const folderWithFilesName = 'files'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderToShowFilesPath = join(__dirname, folderWithFilesName)
    const folderWithFilesPath = join(__dirname, folderWithFilesName)

    if (!existsSync(folderWithFilesPath) || !existsSync(folderToShowFilesPath)) {
        throw new Error('FS operation failed');
    }

    try {
        const files = await readdir(folderToShowFilesPath);
        files.forEach(file => console.log(file));
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await list();
