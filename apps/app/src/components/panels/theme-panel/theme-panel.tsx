import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import type React from "react";
import { Section } from "../common/section";
import { THEME_ACCENT_COLORS, THEME_GRAY_COLORS } from "./constants";
import type { ThemeData } from "./type";

const COLOR_WIDTH = "25px";
const APPEARANCE_CLASS =
  "bg-gray-4 rounded-sm p-2 w-full flex gap-1.5 justify-center items-center cursor-pointer";

export const ThemePanel = ({
  setThemeValue,
  themeValue,
}: {
  setThemeValue: React.Dispatch<React.SetStateAction<ThemeData>>;
  themeValue: ThemeData;
}) => {
  return (
    <div className="flex gap-6 flex-col">
      <Section title="Accent color">
        <div className="flex gap-2 flex-wrap">
          {THEME_ACCENT_COLORS.map((c) => (
            <div
              className="cursor-pointer"
              key={`theme-accent-picker-${c}`}
              onClick={() =>
                setThemeValue((prev) => ({ ...prev, accentColor: c }))
              }
              style={{
                backgroundColor: `var(--${c}-7)`,
                outline:
                  themeValue.accentColor === c
                    ? "2px solid var(--gray-12)"
                    : "",
                outlineOffset: "2px",
                width: COLOR_WIDTH,
                height: COLOR_WIDTH,
                borderRadius: "100%",
              }}
            />
          ))}
        </div>
      </Section>
      <Section title="Gray color">
        <div className="flex gap-2 flex-wrap">
          {THEME_GRAY_COLORS.map((c) => (
            <div
              className="cursor-pointer"
              onClick={() =>
                setThemeValue((prev) => ({ ...prev, grayColor: c }))
              }
              key={`theme-gray-picker-${c}`}
              style={{
                outline:
                  themeValue.grayColor === c ? "2px solid var(--gray-12)" : "",
                outlineOffset: "2px",
                backgroundColor: `var(--${c}-6)`,
                width: COLOR_WIDTH,
                height: COLOR_WIDTH,
                borderRadius: "100%",
              }}
            />
          ))}
        </div>
      </Section>
      <Section title="Appearance">
        <div className="flex gap-2 max-w-full">
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                appearance: "light",
              }))
            }
            style={{
              outline:
                themeValue.appearance === "light"
                  ? "2px solid var(--gray-12)"
                  : "",
            }}
            className={APPEARANCE_CLASS}
          >
            <Icons.Sun />
            Light
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                appearance: "dark",
              }))
            }
            style={{
              outline:
                themeValue.appearance === "dark"
                  ? "2px solid var(--gray-12)"
                  : "",
            }}
            className={APPEARANCE_CLASS}
          >
            <Icons.Moon />
            Dark
          </div>
        </div>
      </Section>
      <Section title="Radius">
        <div className="flex gap-2 flex-wrap">
          <RadiusBox
            radius="0"
            onClick={() =>
              setThemeValue((prev) => ({ ...prev, radius: "none" }))
            }
            text="None"
            selected={themeValue.radius === "none"}
          />
          <RadiusBox
            onClick={() =>
              setThemeValue((prev) => ({ ...prev, radius: "small" }))
            }
            radius="0.125rem"
            text="Small"
            selected={themeValue.radius === "small"}
          />
          <RadiusBox
            onClick={() =>
              setThemeValue((prev) => ({ ...prev, radius: "medium" }))
            }
            radius="0.25rem"
            text="Medium"
            selected={themeValue.radius === "medium"}
          />
          <RadiusBox
            onClick={() =>
              setThemeValue((prev) => ({ ...prev, radius: "large" }))
            }
            radius="0.5rem"
            text="Large"
            selected={themeValue.radius === "large"}
          />
          <RadiusBox
            onClick={() =>
              setThemeValue((prev) => ({ ...prev, radius: "full" }))
            }
            radius="9999px"
            text="Full"
            selected={themeValue.radius === "full"}
          />
        </div>
      </Section>
      <Section title="Panel Background">
        <div className="flex gap-2 max-w-full">
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                scaling: "90%",
              }))
            }
            style={{
              outline:
                themeValue.scaling === "90%" ? "2px solid var(--gray-12)" : "",
            }}
            className={APPEARANCE_CLASS}
          >
            90%
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                scaling: "95%",
              }))
            }
            style={{
              outline:
                themeValue.scaling === "95%" ? "2px solid var(--gray-12)" : "",
            }}
            className={APPEARANCE_CLASS}
          >
            95%
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                scaling: "100%",
              }))
            }
            style={{
              outline:
                themeValue.scaling === "100%" ? "2px solid var(--gray-12)" : "",
            }}
            className={APPEARANCE_CLASS}
          >
            100%
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                scaling: "105%",
              }))
            }
            style={{
              outline:
                themeValue.scaling === "105%" ? "2px solid var(--gray-12)" : "",
            }}
            className={APPEARANCE_CLASS}
          >
            105%
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                scaling: "110%",
              }))
            }
            style={{
              outline:
                themeValue.scaling === "110%" ? "2px solid var(--gray-12)" : "",
            }}
            className={APPEARANCE_CLASS}
          >
            110%
          </div>
        </div>
      </Section>
      <Section title="Panel Background">
        <div className="flex gap-2 max-w-full">
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                panelBackground: "translucent",
              }))
            }
            style={{
              outline:
                themeValue.panelBackground === "translucent"
                  ? "2px solid var(--gray-12)"
                  : "",
            }}
            className={APPEARANCE_CLASS}
          >
            <Icons.CircleHalf2 />
            Translucent
          </div>
          <div
            onClick={() =>
              setThemeValue((prev) => ({
                ...prev,
                panelBackground: "solid",
              }))
            }
            style={{
              outline:
                themeValue.panelBackground === "solid"
                  ? "2px solid var(--gray-12)"
                  : "",
            }}
            className={APPEARANCE_CLASS}
          >
            <Icons.Circle />
            Solid
          </div>
        </div>
      </Section>
    </div>
  );
};

const RadiusBox = ({
  radius,
  text,
  selected,
  onClick,
}: {
  radius: string;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick} className="flex gap-1 flex-col items-center">
      <div
        className={clsx(
          "p-3 outline outline-transparent border border-gray-6 rounded-sm",
          {
            "!outline-gray-12": selected,
          },
        )}
      >
        <div className="w-[35px] h-[35px] overflow-hidden">
          <div
            style={{
              borderRadius: radius,
            }}
            className="bg-indigo-5 border-t-2 border-l-2 border-indigo-10 w-[50px] h-[50px]"
          />
        </div>
      </div>
      <Text className="text-gray-11">{text}</Text>
    </div>
  );
};
