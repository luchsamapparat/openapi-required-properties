import { readFile, writeFile } from "node:fs/promises";
import YAWN from 'yawn-yaml/cjs';

export async function modifyYamlFile(filePath: string, updateFn: (json: any) => any) {
    const yawn = await readYamlFile(filePath);
    const json = yawn.json;
    updateFn(json);
    yawn.json = json;
    writeYamlFile(filePath, yawn);
}

async function readYamlFile(filePath: string) {
    const file = await readFile(filePath, 'utf8');
    return new YAWN(file);
}

async function writeYamlFile(filePath: string, yawn: YAWN) {
    await writeFile(filePath, yawn.yaml);
}

export function isYAML(fileName: string) {
    const normalizedFileName = fileName.toLowerCase();
    return (
        normalizedFileName.endsWith('.yml') ||
        normalizedFileName.endsWith('.yaml')
    );
};