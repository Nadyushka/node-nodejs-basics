import { Transform } from 'node:stream'
// import { pipeline } from 'node:stream/promises'

const transform = async () => {
    // Write your code here

    const reversedText = new Transform({
        transform(chunk, encoding, callback) {
            const reversedText = chunk.toString().split('').reverse().join('')
            callback(null, `${reversedText}\n`)
        },
    })

    process.stdin.pipe(reversedText).pipe(process.stdout);

    /** Alternative option
    try {
        await pipeline(process.stdin, reversedText, process.stdout);
    } catch (err) {
        console.error('There is an error:', err);
    }*/

    /** ОProcess will be stopped in 10s */
    setTimeout(() =>  process.exit(), 10000)
};

await transform();
