import { IJsonConverter } from "../Converters/IJsonConverter";
import { JsonValue } from "../JsonTypes";
import { JsonConvertError } from "../JsonConvertError";

const defaultTrueStrings = [
    "t",
    "true",
    "y",
    "yes",
    "1",
    "on"
]

const defaultFalseStrings = [
    "f",
    "false",
    "n",
    "no",
    "0",
    "-1",
    "off"
]

const stringComparer = new Intl.Collator(void 0, { sensitivity: "base" });

function testStrings(a: string, b: string[]) {
    return b.some(b2 => stringComparer.compare(a, b2) === 0);
}

/**
 * A JSON converter for boolean values.
 */
export class FlexibleBooleanConverter implements IJsonConverter<boolean | null> {

    /**
     * Creates a new BooleanConverter using the default
     */
    constructor();
    constructor(
        public readonly trueStrings: string[] = defaultTrueStrings,
        public readonly falseStrings: string[] = defaultFalseStrings
    ) { }

    WriteJson(value: boolean | null): JsonValue {
        return value;
    }

    ReadJson(value: JsonValue): boolean | null {



        switch (typeof value) {
            case "boolean":
                return value;
            case "string":
                if (testStrings(value, this.trueStrings)) return true;
                if (testStrings(value, this.falseStrings)) return false;
                break;
            case "number":
                if (value === 1) return true;
                if (value === 0 || value === -1) return false;
                break;
            case "object":
                if(value === null) return null;
                break;
            case "undefined":
                return null;
        }
        throw new JsonConvertError(`JSON value could not be converted to boolean`);
    }

}
