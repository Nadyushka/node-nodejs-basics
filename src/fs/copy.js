import { existsSync } from 'node:fs';
import {  copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const copy = async () => {
    // Write your code here

    const folderToCreateName = 'files_copy'
    const folderToCopyName = 'files'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderToCopyPath = join(__dirname, folderToCopyName)
    const folderToCreatePath = join(__dirname, folderToCreateName)

    if (!existsSync(folderToCopyPath) || existsSync(folderToCreatePath) ) {
        throw new Error('FS operation failed');
    }

    try {
        await mkdir(folderToCreatePath);

        const files = await readdir(folderToCopyPath);

        for (const file of files) {
            const pathOfCurrentPosition = join(__dirname, folderToCopyName, file)
            const pathOfNewPosition = join(__dirname, folderToCreateName, file)

            await copyFile(pathOfCurrentPosition, pathOfNewPosition)
        }

    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
