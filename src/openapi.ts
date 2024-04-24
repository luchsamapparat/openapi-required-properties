import { forEach, has, isPlainObject, keys } from "lodash-es";

type Schema = {
    properties: Record<string, any>;
    required?: string[];
}

const isSchema = (json: any): json is Schema => (
    isPlainObject(json) &&

    has(json, 'type') &&
    json.type === 'object' &&

    has(json, 'properties') &&
    isPlainObject(json.properties)
);

const isSchemaWithoutRequired = (json: any): json is Schema => (
    isSchema(json) &&
    !has(json, 'required')
);

export function addRequiredList(schema: Schema) {
    if (!isSchemaWithoutRequired(schema)) {
        return
    }
    schema.required = keys(schema.properties);
}

export function updateSchemas(json: any, updateSchema: (schema: Schema) => void) {
    if (!isPlainObject(json)) {
        return;
    }

    forEach(json, value => {
        if (isSchema(value)) {
            updateSchema(value);
        }

        if (isPlainObject(value)) {
            updateSchemas(value, updateSchema);
        }
    });
}