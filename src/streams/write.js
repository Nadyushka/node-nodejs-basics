import { createWriteStream, existsSync } from "node:fs"
import { join } from 'node:path';
import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const write = async () => {
    // Write your code here

    const fileName = 'fileToWrite.txt'
    const folderWithFile = 'files'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderPath = join(__dirname, folderWithFile)
    const filePath = join(__dirname, folderWithFile, fileName)
    const option = { encoding: 'utf8' }

    if (!existsSync(__dirname) || !existsSync(folderPath) || !existsSync(filePath)) {
        throw new Error(`Error writing file: ${fileName}`)
    }

    const writeStream = createWriteStream(filePath, option)

    writeStream.on('error', (err) => console.error('There is an error:', err));

    process.stdin.on('data', (data) =>  writeStream.write(data.toString()))

    /** Alternative option, when we need to write all data without any manipulations with it */
   // process.stdin.pipe(writeStream);

    /** Process will be stopped in 10s, setTimeout can be removed to make process infinite */
    setTimeout(() =>  process.exit(), 10000)
};

await write();
