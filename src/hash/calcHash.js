import { createReadStream, existsSync } from "node:fs"
import { join } from 'node:path';
import { createHash } from 'node:crypto'
import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const calculateHash = async () => {
    // Write your code here

    const fileName = 'fileToCalculateHashFor.txt'
    const folderWithFile = 'files'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderPath = join(__dirname, folderWithFile)
    const filePath = join(__dirname, folderWithFile, fileName)

    if (!existsSync(__dirname) || !existsSync(folderPath) || !existsSync(filePath)) {
        throw new Error(`Error reading file: ${fileName}`)
    }

    const hash = createHash('sha256')
    const stream = createReadStream(filePath)

    stream.on( 'data',(data) => hash.update(data))

    stream.on('end', () => {
        const fileHash = hash.digest('hex')
        console.log(`SHA-256 Hash for ${filePath}: ${fileHash}`)
    })

    stream.on('error', (error) => {
        throw new Error(`Error reading file: ${error.message}`)
    })
};

await calculateHash();
