import { clsx } from "clsx";
import { ComponentDescriptionField } from "./metadata-form-feilds/description";
import { ComponentKeywordsField } from "./metadata-form-feilds/keywords";
import { ComponentNameField } from "./metadata-form-feilds/name";

const fieldWrapperClass = "flex flex-col gap-1";

export const MetadataForm = () => {
  return (
    <div className="flex w-full h-full p-3 gap-3 flex-col">
      <div className={clsx(fieldWrapperClass)}>
        <ComponentNameField />
      </div>
      <div className={clsx(fieldWrapperClass)}>
        <ComponentDescriptionField />
      </div>
      <div className={clsx(fieldWrapperClass)}>
        <ComponentKeywordsField />
      </div>
    </div>
  );
};
