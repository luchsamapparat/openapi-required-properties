import { Command } from '@commander-js/extra-typings';
import { resolve } from 'node:path';
import { getFilePaths } from './file';
import { addRequiredList, updateSchemas } from './openapi.js';
import { isYAML, modifyYamlFile } from './yaml';

const program = new Command()
    .argument('<path>');

program.parse();

const path = resolve(process.cwd(), program.args[0]);

const filePaths = await getFilePaths(path, isYAML);

for (const filePath of filePaths) {
    await modifyYamlFile(
        filePath,
        (document: any) => {
            updateSchemas(document, addRequiredList);
        }
    );
}
