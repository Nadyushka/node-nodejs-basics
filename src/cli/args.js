const parseArgs = () => {
    // Write your code here

    const args = process.argv.slice(2)
    const argKeys = []
    const argValues = []

    for (let i = 0; i < args.length; i++) {
        i % 2 === 0 ? argKeys.push(args[i]) : argValues.push(args[i])
    }

    let results = ''

    for (let i = 0; i < argKeys.length; i++) {
        if (argValues[i]) {
            const separator = argKeys.length === i + 1  ? '' : ', '
            results += `${argKeys[i].slice(2)} is ${argValues[i]}${separator}`
        }
    }


    console.log(results)
};

parseArgs();
