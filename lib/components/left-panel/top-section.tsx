import { TabsList, TabsTrigger, TabsContent, Tabs } from '../ui/tabs';

import { PagesContainer } from './containers/pages/pages';

export const TopSection = () => {
  return (
    <div className="flex w-full flex-col p-3">
      <Tabs defaultValue="pages">
        <TabsList className="w-full">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        <TabsContent value="pages">
          <PagesContainer />
        </TabsContent>
        <TabsContent value="components">
          <div>Bye</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
