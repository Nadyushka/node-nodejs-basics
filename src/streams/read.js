import { createReadStream, existsSync } from "node:fs"
import { join } from 'node:path';
import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const read = async () => {
    // Write your code here

    const fileName = 'fileToRead.txt'
    const folderWithFile = 'files'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderPath = join(__dirname, folderWithFile)
    const filePath = join(__dirname, folderWithFile, fileName)
    const option = { encoding: 'utf8' }

    if (!existsSync(__dirname) || !existsSync(folderPath) || !existsSync(filePath)) {
        throw new Error(`Error reading file: ${fileName}`)
    }

    const readStream = createReadStream(filePath, option)

    readStream.pipe(process.stdout)
    readStream.on('error', (error) => console.error('There is an error:', error));

    /**  Alternative option, when we need to read and to write data with better control on chunks
     readStream.on('data', (chunk) => process.stdout.write(chunk));
     readStream.on('error', (error) =>  console.error('There is an error:', err);
     */
};

await read();
