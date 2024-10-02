import { availableParallelism, cpus } from 'node:os'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import {getFileAndFolderPath} from "../tools/getFileAndFolderPath.js";

const performCalculations = async () => {
    // Write your code here

    const fileName = 'worker.js'
    const { __dirname } = getFileAndFolderPath(import.meta.url)
    const workerFilePath = path.join(__dirname, fileName)

    /**
     * Alternative
     * const numOfCores = availableParallelism();
     */

    const numOfCores = cpus().length;
    const workers = []

    const createWorker = (data) => {
        return new Promise((res, _) => {
            const worker = new Worker(workerFilePath, { workerData: data })

            worker.on('message', (data) => res({ status: 'resolved', data }))
            worker.on('error', () => res({ status: 'error', data: null }))
        })
    }

    for (let i = 0; i < numOfCores; i++) {
        workers.push(createWorker(i + 10))
    }

    console.log(workers)
    const workerResults = await Promise.all(workers)
    console.log(workerResults)
};

await performCalculations();
