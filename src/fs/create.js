import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const create = async () => {
    // Write your code here

    const folderName = 'files'
    const fileInnerText = 'I am fresh and young';
    const fileName = 'fresh.txt'
    const options = {
        flag: 'wx',
        encoding: 'utf8'
    }

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const fileToCreatePath = join(__dirname, folderName, fileName)
    const folderWithFileName = join(__dirname, folderName)

    if (!existsSync(folderWithFileName) || existsSync(fileToCreatePath)) {
        throw new Error('FS operation failed');
    }

    try {
       await writeFileSync(fileToCreatePath, fileInnerText, options);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await create();
