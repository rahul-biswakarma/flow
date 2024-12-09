import type {
  PropSchema,
  PropsType,
} from "@/components/product/component-builder/types";
import type { Properties } from "@/types";

export const propertiesClientToServer = (props: PropSchema[]): Properties[] => {
  return props.map((prop) => {
    return {
      code_name: prop.propName,
      visual_name: prop.visualName,
      type: propsTypesClientToServer(prop.propType),
      description: prop.description,
      ...(prop.objectSchema && {
        object_schema: prop.objectSchema,
      }),
      is_list: prop.isList,
      required: prop.required,
    } as unknown as Properties;
  });
};

function propsTypesClientToServer(props: PropsType): Properties["type"] {
  switch (props) {
    case "text":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    case "self":
      return "self";
    default:
      return "string";
  }
}
