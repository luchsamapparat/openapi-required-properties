import { readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

type Filter = (fileName: string) => boolean;

export async function getFilePaths(rootPath: string, filter: Filter) {
    console.error(`Collecting files from ${rootPath}`);
    let filePaths: string[] = [];
    try {
        const fileNames = await readdir(rootPath);

        for (const fileName of fileNames) {
            const filePath = resolve(rootPath, fileName);
            const fileStats = await stat(filePath);

            if (fileStats.isFile() && filter(fileName)) {
                filePaths = [...filePaths, filePath];
            } else if (fileStats.isDirectory()) {
                filePaths = [...filePaths, ...(await getFilePaths(filePath, filter))];
            }
        }

    }
    catch (error) {
        console.error(`Error while iterating over files in ${rootPath}`, error);
    }

    return filePaths;
}
