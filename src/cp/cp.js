import { fork } from 'node:child_process'
import path from 'node:path'
import { getFileAndFolderPath } from "../tools/getFileAndFolderPath.js";

const spawnChildProcess = async (args) => {
    // Write your code here

    const folderName= 'files'
    const fileName = 'script.js'
    const { __dirname } = getFileAndFolderPath(import.meta.url)

    const scriptPath = path.join(__dirname, folderName, fileName)

    const childProcess = fork(scriptPath, args)

    childProcess.on('error', (error) => {
        console.error(`Error spawning child process: ${error.message}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( [1, 2, 3]);
