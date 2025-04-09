import type { JSONSchemaType } from "../components";

export const jsonSchemaParse = (
  jsonSchemaString?: string,
  properties?: Record<string, string>
): [string, JSONSchemaType<any>][] => {
  const jsonSchema = JSON.parse(jsonSchemaString ?? "{}");

  const _properties = jsonSchema?.properties;
  if (!_properties) return [];

  return Object.entries(_properties).map((item) => {
    const name = item[0];

    let propertyInfo = item[1] as JSONSchemaType<any>;
    propertyInfo.value = properties?.[name];
    const type = propertyInfo.type;
    if (!type) {
      propertyInfo = {
        ...jsonSchema?.definitions?.[name],
        value: propertyInfo.value,
      };
      if (propertyInfo.enum) {
        const index = propertyInfo.enum.indexOf(propertyInfo.value);
        propertyInfo.value = propertyInfo?.["x-enumNames"][index];
      }
    }
    return [item[0], propertyInfo];
  });
};
