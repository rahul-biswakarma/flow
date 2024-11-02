import type {
  ComponentData,
  PropSchema,
  PropsType,
} from "@/components/product/component-builder/types";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useMemo } from "react";
import { BooleanFieldElement } from "../boolean-field";
import { DropdownFieldElement } from "../dropdown-field";
import { TextFieldElement } from "../text-field";
import type { FieldOnChangeProps } from "../types";
import { GroupFieldWrapper } from "./group-field-wrapper";

export const SchemaBuilder = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const propsData = newComponentData.props;

  const t = useI18n();
  const scopedT = useScopedI18n("props_builder.field");
  const scopedTForTypes = useScopedI18n("props_builder.type");

  const PropsField = ({
    propData,
    onChange,
    onDelete,
  }: {
    propData: PropSchema;
    onChange?: (propData: PropSchema) => void;
    onDelete?: (propName: string) => void;
  }) => {
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
    }, []);

    return (
      <>
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
      </>
    );
  };

  return (
    <GroupFieldWrapper
      className="text-gray-10 !flex flex-col !gap-3 w-full"
      groupLabel={t("component_builder.field.props_schema_group_title")}
      footer={
        <Button
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
      {propsData.map((prop) => (
        <PropsField
          key={prop.propName}
          propData={prop}
          onChange={(propData) => {
            setNewComponentData((prev) => ({
              ...prev,
              props: prev.props.map((p) =>
                p.propName === prop.propName ? propData : p,
              ),
            }));
          }}
          onDelete={(propName: string) => {
            setNewComponentData((prev) => ({
              ...prev,
              props: prev.props.filter((p) => p.propName !== propName),
            }));
          }}
        />
      ))}
    </GroupFieldWrapper>
  );
};
