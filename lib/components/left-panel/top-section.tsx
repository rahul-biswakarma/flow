import { Page } from '@prisma/client';

import { TabsList, TabsTrigger, TabsContent, Tabs } from '../ui/tabs';

import { PagesContainer } from './containers/pages';

interface TopSectionProps {
  pages: Page[];
}

export const TopSection = ({ pages }: TopSectionProps) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs className="w-[400px]" defaultValue="account">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <PagesContainer pages={pages} />
        </TabsContent>
        <TabsContent value="password">
          <div>Bye</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
