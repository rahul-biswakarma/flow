"use client";

import {
  Avatar,
  DropdownMenu,
  Heading,
  HoverCard,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ren/ui/components";
import { useTheme } from "next-themes";

import { Logo } from "@flow/components/logo";
import { DEFAULT_ORG_AVATAR } from "@flow/constants";
import { useScopedI18n } from "@flow/locales/client";
import { useFlowContext } from "@flow/providers";
import { Icons } from "@ren/ui/icons";

import "./navigation-bar.css";
import clsx from "clsx";

export function NavigationBar() {
  const {
    projectData,
    user,
    navigationBarMenuItems,
    activeNavBarItem,
    setActiveNavBarItem,
  } = useFlowContext();
  const scopedT = useScopedI18n("navigation_bar");
  const scopedTUser = useScopedI18n("user");
  const { setTheme, theme, themes } = useTheme();

  const projectName = projectData?.name ?? "Untitled";
  const published = projectData?.is_hosted ?? false;
  const avatar = projectData?.avatar;
  const userAvatar = user?.avatar ?? DEFAULT_ORG_AVATAR;

  return (
    <div className="flex flex-col gap-3 w-[3rem] max-w-[3rem] h-full items-center justify-between z-50 py-3">
      <div className="flex flex-col items-center gap-3">
        <HoverCard.Root>
          <HoverCard.Trigger>
            <div className="flex justify-center items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-9 w-9 p-1 -ml-0.5 rounded-sm">
              {!avatar && <Logo />}
              {avatar && (
                <Avatar
                  className="h-8 w-8"
                  radius="small"
                  src={avatar}
                  fallback={projectName[0] ?? "F"}
                />
              )}
            </div>
          </HoverCard.Trigger>
          <HoverCard.Content
            side="right"
            maxWidth="300px"
            className="rounded-sm"
          >
            <div className="flex gap-3">
              <div className="w-[30px] h-[30px]">
                <Logo />
              </div>
              <div className="flex gap-1 flex-col">
                <Heading size="3" as="h3">
                  {projectName}
                </Heading>
                <div>
                  {published ? (
                    <span className="flex items-center gap-1 bg-green-a5 px-1.5 rounded-lg text-green-10">
                      <div className="w-[8px] h-[8px] rounded-full bg-green-10" />
                      <Text size="1">{scopedT("online")}</Text>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-orange-a5 px-1.5 rounded-lg text-orange-10">
                      <div className="w-[8px] h-[8px] rounded-full bg-orange-10" />
                      <Text size="1">{scopedT("offline")}</Text>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>

        <div className="flex gap-1 flex-col items-center mt-5">
          {navigationBarMenuItems.map((item) => (
            <Tooltip key={item.key}>
              <TooltipTrigger onClick={() => setActiveNavBarItem(item.key)}>
                <div
                  className={clsx(
                    "p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    {
                      "bg-sidebar-accent text-sidebar-accent-foreground":
                        activeNavBarItem === item.key,
                    },
                  )}
                >
                  {item.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="rounded-md bg-gray-1 border-gray-4"
              >
                <div className="p-2 flex items-center justify-center">
                  <Text size="1">{item.title}</Text>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {theme === "dark" ? (
              <Icons.Moon />
            ) : theme === "light" ? (
              <Icons.Sun />
            ) : (
              <Icons.SunMoon />
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="right">
            <DropdownMenu.RadioGroup value={theme}>
              {themes.map((themeOption) => {
                return (
                  <DropdownMenu.RadioItem
                    value={themeOption}
                    key={`theme-selector-navbar-${themeOption}`}
                    onClick={() => {
                      setTheme(themeOption);
                    }}
                  >
                    <Text className="capitalize">{themeOption}</Text>
                  </DropdownMenu.RadioItem>
                );
              })}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 cursor-pointer">
            <Avatar
              className="h-8 w-8"
              radius="small"
              src={userAvatar}
              fallback={projectName[0] ?? "U"}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="right">
            <DropdownMenu.Item>{scopedTUser("settings")}</DropdownMenu.Item>
            <DropdownMenu.Item>{scopedTUser("sign_out")}</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
