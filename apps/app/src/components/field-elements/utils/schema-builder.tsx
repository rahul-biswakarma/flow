import type {
  ComponentData,
  PropSchema,
  PropsType,
} from "@/components/product/component-builder/types";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { useMemo, useState } from "react";
import { BooleanFieldElement } from "../boolean-field";
import { DropdownFieldElement } from "../dropdown-field";
import { TextFieldElement } from "../text-field";
import type { FieldOnChangeProps } from "../types";
import { GroupFieldWrapper } from "./group-field-wrapper";

const ICON_CLASSES = "!w-4 !h-4 text-gray-10";
const MAX_PROPS = 10;

export const SchemaBuilder = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const propsData = newComponentData.props;

  const t = useI18n();

  return (
    <GroupFieldWrapper
      className="text-gray-10 !flex flex-col w-full !gap-2"
      groupLabel={t("component_builder.field.props_schema_group_title")}
      headerAction={
        <Button
          disabled={propsData.length === MAX_PROPS - 1}
          size="1"
          onClick={() => {
            setNewComponentData((prev) => ({
              ...prev,
              props: [
                ...prev.props,
                {
                  visualName: "",
                  propName: "",
                  propType: "text" as PropsType,
                  isList: false,
                },
              ],
            }));
          }}
        >
          <Icons.Plus />
          {t("props_builder.add_field")}
        </Button>
      }
    >
      {propsData.length === 0
        ? null
        : propsData.map((prop, index: number) => (
            <>
              <PropsField
                key={`props-name-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: index is stable; other keys change, causing focus loss
                  index
                }`}
                propData={prop}
                onChange={(propData) => {
                  setNewComponentData((prev) => ({
                    ...prev,
                    props: prev.props.map((p, propIndex) =>
                      propIndex === index ? propData : p,
                    ),
                  }));
                }}
                onDelete={() => {
                  setNewComponentData((prev) => ({
                    ...prev,
                    props: prev.props.filter(
                      (_, propIndex) => propIndex !== index,
                    ),
                  }));
                }}
              />
            </>
          ))}
    </GroupFieldWrapper>
  );
};

const PropsField = ({
  propData,
  onChange,
  onDelete,
}: {
  propData: PropSchema;
  onChange?: (propData: PropSchema) => void;
  onDelete?: (propName: string) => void;
}) => {
  const t = useI18n();
  const scopedT = useScopedI18n("props_builder.field");
  const scopedTForTypes = useScopedI18n("props_builder.type");
  const [isExpanded, setIsExpanded] = useState(true);

  const propsTypeOptions = useMemo(() => {
    return [
      { label: scopedTForTypes("text"), value: "text" },
      { label: scopedTForTypes("number"), value: "number" },
      {
        label: scopedTForTypes("boolean"),
        value: "boolean",
        info: scopedTForTypes("boolean_info"),
      },
      {
        label: scopedTForTypes("object"),
        value: "object",
        info: scopedTForTypes("object_info"),
      },
      {
        label: scopedTForTypes("self"),
        value: "self",
        info: scopedTForTypes("self_info"),
      },
    ];
  }, [scopedTForTypes]);

  return (
    <div className="border border-gray-a3 bg-gray-a2 rounded mb-2">
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyUp={() => setIsExpanded(!isExpanded)}
      >
        <Text size="2" className="text-gray-10">
          {propData.visualName || scopedT("unnamed_prop")}
        </Text>
        <div className="flex items-center gap-4 text-gray-11">
          <Button
            variant="ghost"
            size="1"
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(propData.propName);
            }}
          >
            <Icons.Trash className={ICON_CLASSES} />
          </Button>
          <Button
            variant="ghost"
            color="gray"
            size="1"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <Icons.ChevronUp className={ICON_CLASSES} />
            ) : (
              <Icons.ChevronDown className={ICON_CLASSES} />
            )}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-3 bg-gray-a2 p-3 rounded">
          <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <TextFieldElement
                labelClassName="pt-0"
                label={scopedT("visual_name")}
                fieldInfo={scopedT("visual_name_info")}
                value={propData.visualName ?? ""}
                onChange={(e: FieldOnChangeProps<string>): void => {
                  onChange?.({ ...propData, visualName: e.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <TextFieldElement
                labelClassName="pt-0"
                label={scopedT("props_name")}
                fieldInfo={scopedT("props_name_info")}
                value={propData.propName ?? ""}
                onChange={(e: FieldOnChangeProps<string>): void => {
                  onChange?.({ ...propData, propName: e.value });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 grow">
            <TextFieldElement
              labelClassName="pt-0"
              label={scopedT("description")}
              fieldInfo={scopedT("description_info")}
              value={propData.description ?? ""}
              onChange={(e: FieldOnChangeProps<string>): void => {
                onChange?.({ ...propData, description: e.value });
              }}
            />
          </div>
          <div className="flex w-full gap-2 items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <DropdownFieldElement
                labelClassName="pt-0"
                label={scopedT("props_type")}
                fieldInfo={scopedT("props_type_info")}
                placeholder={t("common.select")}
                options={propsTypeOptions}
                value={propData.propType}
                onChange={(
                  e: FieldOnChangeProps<{ label: string; value: string }>,
                ): void => {
                  onChange?.({
                    ...propData,
                    propType: e.value.value as PropsType,
                  });
                }}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <BooleanFieldElement
                labelClassName="pt-0"
                label={scopedT("is_list")}
                fieldInfo={scopedT("is_list_info")}
                value={propData.isList ?? false}
                onChange={(e: FieldOnChangeProps<boolean>): void => {
                  onChange?.({ ...propData, isList: e.value });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
