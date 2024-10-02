import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getFileAndFolderPath = (metaUrl) => {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = dirname(__filename);

    return {
        __filename, __dirname
    }
}
