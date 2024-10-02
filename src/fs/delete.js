import { existsSync } from 'node:fs';
import {  rm } from 'node:fs/promises';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const remove = async () => {
    // Write your code here

    const folderWithFiles = 'files'
    const fileToDelete = 'fileToRemove.txt'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderWithFilesPath = join(__dirname, folderWithFiles)
    const fileToDeletePath = join(__dirname, folderWithFiles, fileToDelete)

   if (!existsSync(folderWithFilesPath) || !existsSync(fileToDeletePath)) {
       throw new Error('FS operation failed');
   }

   try {
        await rm(fileToDeletePath)
   } catch (e) {
       throw new Error('FS operation failed');
   }

};

await remove();
