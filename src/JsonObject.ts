import { defineMetadata, MetadataKey } from "./Metadata";

function defineJsonObject<TFunction extends Function>(target: TFunction): TFunction | void {
    defineMetadata(MetadataKey.JSON_OBJECT, true, target.prototype);
}

export function JsonObject<TFunction extends Function>(): ClassDecorator;
export function JsonObject<TFunction extends Function>(target: TFunction): TFunction | void;

export function JsonObject<TFunction extends Function>(target?: TFunction): ClassDecorator | TFunction | void {
    return target ? defineJsonObject(target) : defineJsonObject;
  }
