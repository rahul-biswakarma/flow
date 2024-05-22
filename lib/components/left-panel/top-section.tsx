import { Tabs, Tab } from '@nextui-org/tabs';
import { Page } from '@prisma/client';

import { PagesContainer } from './containers/pages';

interface TopSectionProps {
  pages: Page[];
}

export const TopSection = ({ pages }: TopSectionProps) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs fullWidth aria-label="Options">
        <Tab key="pages" title="Pages">
          <PagesContainer pages={pages} />
        </Tab>
        <Tab key="components" title="Components">
          <div>Bye</div>
        </Tab>
      </Tabs>
    </div>
  );
};
