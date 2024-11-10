import { DEFAULT_ORG_AVATAR, DEFAULT_ORG_AVATAR_FALLBACK } from "@/constants";
import { useFlowContext } from "@/context/flow-context";
import { useScopedI18n } from "@/locales/client";
import { Avatar } from "@v1/ui/avatar";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Heading } from "@v1/ui/heading";
import { HoverCard } from "@v1/ui/hover-card";
import { Icons } from "@v1/ui/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@v1/ui/sidebar";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { useTheme } from "next-themes";

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
  const published = projectData?.is_published ?? false;
  const avatar = projectData?.avatar ?? DEFAULT_ORG_AVATAR;

  const userAvatar = user?.avatar_url ?? DEFAULT_ORG_AVATAR;

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
                  >
                    <Avatar
                      className="h-8 w-8 rounded-md"
                      src={avatar}
                      fallback={projectName[0] ?? "U"}
                    />
                  </SidebarMenuButton>
                </HoverCard.Trigger>
                <HoverCard.Content side="right" maxWidth="300px">
                  <div className="flex gap-3">
                    <Avatar
                      size="3"
                      src={avatar ?? DEFAULT_ORG_AVATAR}
                      fallback={projectName[0] ?? DEFAULT_ORG_AVATAR_FALLBACK}
                    />
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="pt-2">
          <SidebarGroup>
            <SidebarMenu>
              {navigationBarMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => setActiveNavBarItem(item.key)}
                        isActive={activeNavBarItem === item.key}
                        className="px-2.5 md:px-2"
                        asChild
                      >
                        <span className="mx-auto">
                          {item.icon}
                          <Text>{item.title}</Text>
                        </span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu className="flex flex-col gap-2">
            <SidebarMenuItem>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <SidebarMenuButton>
                    {(() => {
                      switch (theme) {
                        case "dark":
                          return <Icons.Moon />;
                        case "light":
                          return <Icons.Sun />;
                        default:
                          return <Icons.SunMoon />;
                      }
                    })()}
                  </SidebarMenuButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="right">
                  <DropdownMenu.RadioGroup value={theme}>
                    {themes.map((themeOption) => {
                      return (
                        <DropdownMenu.RadioItem
                          value={themeOption}
                          key={theme}
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
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
                  >
                    <Avatar
                      className="h-8 w-8 rounded-md"
                      src={userAvatar}
                      fallback={projectName[0] ?? "U"}
                    />
                  </SidebarMenuButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="right">
                  <DropdownMenu.Item>
                    {scopedTUser("settings")}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    {scopedTUser("sign_out")}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
