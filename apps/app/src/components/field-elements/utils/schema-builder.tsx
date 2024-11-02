import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useState } from "react";
import { TextFieldElement } from "../text-field";
import type { FieldOnChangeProps } from "../types";
import { GroupFieldWrapper } from "./group-field-wrapper";

const ICON_CLASS = "!w-[16px] !h-[16px]";

export const SchemaBuilder = () => {
  const [showPropEntryField, setShowPropEntryField] = useState(false);

  const scopedT = useScopedI18n("props_builder.field");
  const t = useI18n();

  const propsField = (
    <>
      <div className="flex gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <TextFieldElement
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
          label={scopedT("description")}
          fieldInfo={scopedT("description_info")}
          value={""}
          onChange={(e: FieldOnChangeProps<string>): void => {
            throw new Error("Function not implemented.");
          }}
        />
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
