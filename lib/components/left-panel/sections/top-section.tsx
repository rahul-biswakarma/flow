import { TabsList, TabsTrigger, TabsContent, Tabs } from '../../ui/tabs';

import { ComponentList } from './containers/components/component-list';
import { ListPage } from './containers/pages/page-list';

export const TopSection = () => {
  return (
    <div className="flex w-full flex-col p-3">
      <Tabs defaultValue="pages">
        <TabsList className="w-full">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        <TabsContent value="pages">
          <ListPage />
        </TabsContent>
        <TabsContent value="components">
          <ComponentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
