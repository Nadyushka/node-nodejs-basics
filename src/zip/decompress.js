import { createReadStream, existsSync, createWriteStream } from "node:fs"
import { join } from 'node:path';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'stream/promises'
import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const decompress = async () => {
    // Write your code here

    const folderWithFiles = 'files'
    const fileToDecompress =  'archive.gz'
    const decompressedFile = 'fileToCompress.txt'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderPath = join(__dirname, folderWithFiles)
    const fileToDecompressPath = join(__dirname, folderWithFiles, fileToDecompress)
    const decompressedFilePath = join(__dirname, folderWithFiles, decompressedFile)

    if (!existsSync(__dirname) || !existsSync(folderPath) || !existsSync(fileToDecompressPath)) {
        throw new Error(`Error compress file: ${fileToDecompress}`)
    }

    const readStream = createReadStream(fileToDecompressPath);
    const writeStream = createWriteStream(decompressedFilePath);

    const gunzip = createGunzip();

    try {
        await pipeline(readStream, gunzip, writeStream)
    } catch (error) {
        console.error('Error during decompression:', error)
    }
};

await decompress();
