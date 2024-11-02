import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useState } from "react";
import { BooleanFieldElement } from "../boolean-field";
import { DropdownFieldElement } from "../dropdown-field";
import { TextFieldElement } from "../text-field";
import type { FieldOnChangeProps } from "../types";
import { GroupFieldWrapper } from "./group-field-wrapper";

export const SchemaBuilder = () => {
  const [showPropEntryField, setShowPropEntryField] = useState(false);

  const t = useI18n();
  const scopedT = useScopedI18n("props_builder.field");
  const scopedTForTypes = useScopedI18n("props_builder.type");

  const propsField = (
    <>
      <div className="flex gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <TextFieldElement
            labelClassName="pt-0"
            label={scopedT("visual_name")}
            fieldInfo={scopedT("visual_name_info")}
            value={""}
            onChange={(e: FieldOnChangeProps<string>): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <TextFieldElement
            labelClassName="pt-0"
            label={scopedT("props_name")}
            fieldInfo={scopedT("props_name_info")}
            value={""}
            onChange={(e: FieldOnChangeProps<string>): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 grow">
        <TextFieldElement
          labelClassName="pt-0"
          label={scopedT("description")}
          fieldInfo={scopedT("description_info")}
          value={""}
          onChange={(e: FieldOnChangeProps<string>): void => {
            throw new Error("Function not implemented.");
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
            options={[
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
            ]}
            onChange={(e): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <BooleanFieldElement
            labelClassName="pt-0"
            label={scopedT("is_list")}
            fieldInfo={scopedT("is_list_info")}
            value={false}
            onChange={(e: FieldOnChangeProps<boolean>): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </>
  );
  return (
    <GroupFieldWrapper
      className="text-gray-10 !flex flex-col !gap-3 w-full"
      groupLabel={t("component_builder.field.props_schema_group_title")}
      footer={
        <Button
          disabled={showPropEntryField}
          onClick={() => setShowPropEntryField(true)}
        >
          <Icons.Plus />
          {t("props_builder.add_field")}
        </Button>
      }
    >
      {showPropEntryField && propsField}
    </GroupFieldWrapper>
  );
};
