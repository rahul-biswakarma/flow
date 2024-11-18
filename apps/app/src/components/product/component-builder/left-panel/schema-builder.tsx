import { fieldFontSize } from "@/components/field-elements/constants";
import type {
  ComponentData,
  PropSchema,
  PropsType,
} from "@/components/product/component-builder/types";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { nanoid } from "nanoid";
import { Fragment, useMemo, useState } from "react";
import { BooleanFieldElement } from "../../../field-elements/boolean-field";
import { DropdownFieldElement } from "../../../field-elements/dropdown-field";
import { TextFieldElement } from "../../../field-elements/text-field";
import type { FieldOnChangeProps } from "../../../field-elements/types";
import { ObjectTypeFields } from "./object-field";

const ICON_CLASSES = "!w-4 !h-4 !text-gray-10";
const MAX_PROPS = 10;

const SchemaBuilder = ({
  newComponentData,
  setNewComponentData,
}: {
  newComponentData: ComponentData;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const propsData = newComponentData.props;

  const t = useI18n();

  return (
    <div className="flex flex-col w-full text-gray-10 gap-2">
      {propsData.length === 0
        ? null
        : propsData.map((prop, index: number) => (
            <Fragment key={prop.id}>
              <PropsField
                propData={prop}
                onChange={(propData) => {
                  setNewComponentData((prev) => ({
                    ...prev,
                    props: prev.props.map((p) =>
                      p.id === propData.id ? propData : p,
                    ),
                  }));
                }}
                onDelete={() => {
                  setNewComponentData((prev) => ({
                    ...prev,
                    props: prev.props.filter((p) => p.id !== prop.id),
                  }));
                }}
              />
            </Fragment>
          ))}
      <Button
        variant="soft"
        color="gray"
        disabled={propsData.length >= MAX_PROPS}
        onClick={() => {
          setNewComponentData((prev) => ({
            ...prev,
            props: [
              ...prev.props,
              {
                id: nanoid(),
                visualName: "",
                propName: "",
                propType: "text" as PropsType,
                isList: false,
              },
            ],
          }));
        }}
      >
        <Icons.Plus className={ICON_CLASSES} />
        {t("props_builder.add_field")}
      </Button>
    </div>
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
    <div className="bg-panel border-panel rounded-sm mb-2">
      <div
        className={clsx(
          "flex justify-between items-center p-4 cursor-pointer border-outline-01",
          {
            "border-b": isExpanded,
          },
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyUp={() => setIsExpanded(!isExpanded)}
      >
        <Text className={clsx("text-gray-11", fieldFontSize)}>
          <span className="text-gray-10">{scopedT("field")}</span>
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
        <div className="flex flex-col gap-3 rounded p-3">
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
                dropdownKey="props_type"
                labelClassName="!pt-0"
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
                labelClassName="!pt-0"
                label={scopedT("is_list")}
                fieldInfo={scopedT("is_list_info")}
                value={propData.isList ?? false}
                onChange={(e: FieldOnChangeProps<boolean>): void => {
                  onChange?.({ ...propData, isList: e.value });
                }}
              />
            </div>
          </div>
          {propData.propType === "object" && (
            <>
              <div className="w-full h-0.5 bg-gray-03 border border-dashed border-outline-03" />
              <ObjectTypeFields
                objectSchema={propData.objectSchema || {}}
                fieldName={propData.visualName || propData.propName || "Object"}
                onChange={(newSchema) => {
                  if (onChange) {
                    onChange({ ...propData, objectSchema: newSchema });
                  }
                }}
                nestingLevel={0}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SchemaBuilder;
