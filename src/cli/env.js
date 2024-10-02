const parseEnv = () => {
    // Write your code here

    const env = process.env
    const variables = Object.keys(env)
        .filter(key => key.startsWith('RSS_'))
        .map(key => `${key}=${env[key]}`)
        .join('; ');

   console.log(variables);
};

parseEnv();
