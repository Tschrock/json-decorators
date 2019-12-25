import { IJsonConverter } from "./Converters";

export enum MetadataKey {
    JSON_OBJECT = "_JsonObject",
    JSON_REQUIRED = "_JsonRequired",
    JSON_PROPERTIES = "_JsonProperties",
    DESIGN_TYPE = "design:type"
}

export interface JsonPropertyData {
    key: string;
    converter: IJsonConverter<unknown>;
}

export type MetadataTypeMap = {
    [MetadataKey.JSON_OBJECT]: boolean;
    [MetadataKey.JSON_REQUIRED]: boolean;
    [MetadataKey.JSON_PROPERTIES]: Map<string | symbol, JsonPropertyData>;
    [MetadataKey.DESIGN_TYPE]: new (...args: unknown[]) => unknown;
}

export function getMetadata<T extends keyof MetadataTypeMap>(key: T, target: object, propertyKey?: string | symbol): MetadataTypeMap[T] | undefined {
    if(propertyKey) return Reflect.getMetadata(key, target, propertyKey);
    else return Reflect.getMetadata(key, target);
}

export function getOwnMetadata<T extends keyof MetadataTypeMap>(key: T, target: object, propertyKey?: string | symbol): MetadataTypeMap[T] | undefined {
    if(propertyKey) return Reflect.getOwnMetadata(key, target, propertyKey);
    else return Reflect.getOwnMetadata(key, target);
}

export function defineMetadata<T extends keyof MetadataTypeMap>(key: T, value: MetadataTypeMap[T], target: object, propertyKey?: string | symbol): void {
    if(propertyKey) Reflect.defineMetadata(key, value, target, propertyKey);
    else Reflect.defineMetadata(key, value, target);
}

export function getJsonPropertyMetadata(target: object): Map<string | symbol, JsonPropertyData> {

    const jsonProps = new Map<string | symbol, JsonPropertyData>();

    while (target != null) {

        const props = getOwnMetadata(MetadataKey.JSON_PROPERTIES, target);
        if (props) {
            for (const [propKey, propMeta] of props) {
                if (!jsonProps.has(propKey)) {
                    jsonProps.set(propKey, propMeta);
                }
            }
        }

        target = Object.getPrototypeOf(target);
    }

    return jsonProps;

}
