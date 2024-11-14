import { Icons } from "@v1/ui/icons";
import { UnitTextInput } from "./unit-text-input";

interface BorderControlProps {
  value: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  unified: boolean;
  onChange: (value: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  }) => void;
}

export const BorderControl = ({
  value,
  onChange,
  unified,
}: BorderControlProps) => {
  const allEqual =
    value.top === value.right &&
    value.right === value.bottom &&
    value.bottom === value.left;
  const unifiedValue = allEqual ? value.top : "0";

  const handleUnifiedChange = (newValue: string) => {
    onChange({
      top: newValue,
      right: newValue,
      bottom: newValue,
      left: newValue,
    });
  };

  return (
    <div className="space-y-2">
      {!unified ? (
        <UnitTextInput
          slotValue={<Icons.BorderSides />}
          tooltipContent="Border Width"
          value={unifiedValue ?? "0"}
          handleChange={handleUnifiedChange}
          units={["px", "rem"]}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <UnitTextInput
            slotValue={<Icons.BorderTop />}
            tooltipContent="Top Border"
            value={value.top ?? "0"}
            handleChange={(v) => onChange({ ...value, top: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.BorderRight />}
            tooltipContent="Right Border"
            value={value.right ?? "0"}
            handleChange={(v) => onChange({ ...value, right: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.BorderBottom />}
            tooltipContent="Bottom Border"
            value={value.bottom ?? "0"}
            handleChange={(v) => onChange({ ...value, bottom: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.BorderLeft />}
            tooltipContent="Left Border"
            value={value.left ?? "0"}
            handleChange={(v) => onChange({ ...value, left: v })}
            units={["px", "rem"]}
          />
        </div>
      )}
    </div>
  );
};

interface BorderRadiusControlProps {
  value: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  unified: boolean;
  onChange: (value: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  }) => void;
}

export const BorderRadiusControl = ({
  value,
  onChange,
  unified,
}: BorderRadiusControlProps) => {
  const allEqual =
    value.topLeft === value.topRight &&
    value.topRight === value.bottomLeft &&
    value.bottomLeft === value.bottomRight;
  const unifiedValue = allEqual ? value.topLeft : "0";

  const handleUnifiedChange = (newValue: string) => {
    onChange({
      topLeft: newValue,
      topRight: newValue,
      bottomLeft: newValue,
      bottomRight: newValue,
    });
  };

  return (
    <div className="space-y-2">
      {!unified ? (
        <UnitTextInput
          slotValue={<Icons.BorderCorners />}
          tooltipContent="Border Radius"
          value={unifiedValue ?? "0"}
          handleChange={handleUnifiedChange}
          units={["px", "rem"]}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <UnitTextInput
            slotValue={<Icons.RadiusTopLeft />}
            tooltipContent="Top Left Radius"
            value={value.topLeft ?? "0"}
            handleChange={(v) => onChange({ ...value, topLeft: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.RadiusTopRight />}
            tooltipContent="Top Right Radius"
            value={value.topRight ?? "0"}
            handleChange={(v) => onChange({ ...value, topRight: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.RadiusBottomLeft />}
            tooltipContent="Bottom Left Radius"
            value={value.bottomLeft ?? "0"}
            handleChange={(v) => onChange({ ...value, bottomLeft: v })}
            units={["px", "rem"]}
          />
          <UnitTextInput
            slotValue={<Icons.RadiusBottomRight />}
            tooltipContent="Bottom Right Radius"
            value={value.bottomRight ?? "0"}
            handleChange={(v) => onChange({ ...value, bottomRight: v })}
            units={["px", "rem"]}
          />
        </div>
      )}
    </div>
  );
};
