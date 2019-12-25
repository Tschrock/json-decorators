json-decorators
==============

`json-decorators` maps json properties to Typescript classes using decorators.

## Example Class

<details>
<summary>Click to expand</summary>

```ts
// Person.ts

import { JsonObject, JsonRequired, JsonProperty, ISODateConverter, IntegerConverter, ArrayConverter, RecordConverter, MapConverter, StringConverter } from "json-decorators";


@JsonObject()
export class PhoneNumber {

    @JsonRequired
    @JsonProperty("prop1", String)
    public prop1!: string;

    @JsonProperty("prop2", ISODateConverter)
    public prop2?: Date;

}

/**
 * Serializable classes are marked with a `@JsonObject()` decorator. Classes
 * without this decorator will not be mapped.
 */
@JsonObject()
export class Person {

    /**
     * Serializable properties are marked with a `@JsonProperty()` decorator.
     * Properties without this decorator will not be mapped.
     *
     * If "emitDecoratorMetadata" is enabled in your tsconfig, simple types
     * will be handled automatically.
     */
    @JsonProperty()
    public FirstName?: string;

    /**
     * You can specify a json key to use.
     */
    @JsonProperty("FamilyName")
    public LastName?: string;

    /**
     * Properties with inferred or complex types will need to specify the
     * type converter to use.
     */
    @JsonProperty(IntegerConverter)
    public Age = 0;

    /**
     * There are built-in converters for common formats, such as ISO-formatted
     * dates.
     */
    @JsonProperty(ISODateConverter)
    public BirthDate?: Date;

    /**
     * You can use another mappable class in place of a converter.
     */
    @JsonProperty(PhoneNumber)
    public PhoneNumber?: PhoneNumber;

    /**
     * For arrays you can use the built-in array converter.
     */
    @JsonProperty(new ArrayConverter(PhoneNumber))
    public PhoneNumbers?: PhoneNumber[];

    /**
     * String->value maps can be use a record converter
     */
    @JsonProperty("images", new RecordConverter(IntegerConverter))
    public ImageIds?: Record<string, number>;

    /**
     * Or they can use map converter
     */
    @JsonProperty("links", new MapConverter(IntegerConverter))
    public TagIds?: Map<string, number>;

}

```

</details>

## Example Usage

Comming Soon
