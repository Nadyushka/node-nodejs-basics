import { createReadStream, existsSync, createWriteStream } from "node:fs"
import { join } from 'node:path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'stream/promises'

import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const compress = async () => {
    // Write your code here

    const folderWithFiles = 'files'
    const fileToCompress =  'fileToCompress.txt'
    const compressedFile = 'archive.gz'

    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const folderPath = join(__dirname, folderWithFiles)
    const fileToCompressPath = join(__dirname, folderWithFiles, fileToCompress)
    const compressedFilePath = join(__dirname, folderWithFiles, compressedFile)

    if (!existsSync(__dirname) || !existsSync(folderPath) || !existsSync(fileToCompressPath)) {
        throw new Error(`Error compress file: ${fileToCompress}`)
    }

    const readStream = createReadStream(fileToCompressPath);
    const writeStream = createWriteStream(compressedFilePath);

    const gzip = createGzip();

    readStream
        .pipe(gzip)
        .pipe(writeStream)
        .on('finish', () => {
            console.log(`${folderWithFiles} was compressed to ${compressedFile}`);
        })
        .on('error', (err) => {
            console.error('Error during compression:', err);
        });



    /**
     * Alternative option to finish task
     *     try {
     *         await pipeline(readStream, gzip, writeStream)
     *     } catch (error) {
     *         console.error('Error during compression:', error)
     *     }
     */
};

await compress();
