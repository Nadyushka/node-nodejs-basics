import { existsSync } from 'node:fs';
import {  rename as _rename } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const rename = async () => {
    // Write your code here

    const folderWithFiles = 'files'
    const fileToChange = 'wrongFilename.txt'
    const newFileName = 'properFilename.md'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const fileToRenamePath = join(__dirname, folderWithFiles, fileToChange)
    const renamedFilePath = join(__dirname, folderWithFiles, newFileName)
    const  folderWithFilesPath = join(__dirname, folderWithFiles)

    if (!existsSync(folderWithFilesPath) ||!existsSync(fileToRenamePath) || existsSync(renamedFilePath)) {
        throw new Error('FS operation failed');
    }

    try {
        await _rename(fileToRenamePath, renamedFilePath)
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await rename();
