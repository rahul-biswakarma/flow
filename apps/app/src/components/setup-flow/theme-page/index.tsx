import { ThemeEditor } from "@/components/theme-editor";
import { useScopedI18n } from "@/locales/client";
import type { Theme } from "@/types";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { ThemeProvider } from "@v1/ui/theme-provider";
import type { Dispatch, SetStateAction } from "react";

type ThemePageProps = {
  onNext: () => void;
  onPrev: () => void;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemePage = ({
  theme,
  setTheme,
  onNext,
  onPrev,
}: ThemePageProps) => {
  const scopedT = useScopedI18n("setup");
  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <Heading size="9">{scopedT("theme_page_heading")}</Heading>
      <Text className="text-gray-10" size="3">
        {scopedT("theme_page_description")}
      </Text>
      <div className="grid grid-cols-2 space-x-3 p-3 border border-outline-03 w-full h-full max-h-[500px] max-w-[900px] rounded-lg">
        <ThemeEditor {...{ theme, setTheme }} />
        <div className="w-ful h-full bg-gray-01 rounded-md overflow-hidden">
          <ThemeProvider
            className="w-full h-full rounded-md"
            accentColor="indigo"
            appearance="dark"
            grayColor="sage"
            panelBackground="translucent"
            radius="medium"
            scaling="100%"
          >
            <ScrollArea>
              <div className="w-full h-full bg-gray-4 p-4">
                <Heading size="6" className="mb-4">
                  Theme Preview
                </Heading>

                <Card className="mb-4 p-4 flex flex-col gap-2">
                  <Heading size="4" className="mb-2">
                    Card Example
                  </Heading>
                  <Text className="mb-2">
                    This is how your cards will look.
                  </Text>
                  <Button variant="solid">Primary Button</Button>
                </Card>

                <div className="flex space-x-2 mb-4">
                  <Button variant="solid">Primary</Button>
                  <Button variant="soft" color="crimson">
                    Secondary
                  </Button>
                  <Button variant="outline" color="gray">
                    Outline
                  </Button>
                </div>

                <div className="mb-4">
                  <TextField.Root placeholder="Input field" className="mb-2" />
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft">
                        Options
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘ D">
                        Duplicate
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item shortcut="⌘ N">
                        Archive
                      </DropdownMenu.Item>

                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>
                            Move to project…
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>
                            Advanced options…
                          </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>

                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>Share</DropdownMenu.Item>
                      <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>

                <Tabs.Root defaultValue="account">
                  <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                  </Tabs.List>

                  <div className="pt-3">
                    <Tabs.Content value="account">
                      <Text size="2">Make changes to your account.</Text>
                    </Tabs.Content>

                    <Tabs.Content value="documents">
                      <Text size="2">Access and update your documents.</Text>
                    </Tabs.Content>

                    <Tabs.Content value="settings">
                      <Text size="2">
                        Edit your profile or update contact information.
                      </Text>
                    </Tabs.Content>
                  </div>
                </Tabs.Root>

                <div className="flex flex-col space-y-2">
                  <Text size="1">Text Size 1</Text>
                  <Text size="2">Text Size 2</Text>
                  <Text size="3">Text Size 3</Text>
                  <Text size="4">Text Size 4</Text>
                </div>
              </div>
            </ScrollArea>
          </ThemeProvider>
        </div>
      </div>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("theme_page_next_button")}
        <Icons.MoveRight />
      </Button>
    </div>
  );
};
