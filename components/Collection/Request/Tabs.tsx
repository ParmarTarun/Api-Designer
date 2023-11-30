import React, { FC, ReactNode, useState } from "react";

interface tabsProps {
  tabs: { name: string; element: ReactNode }[];
  defaultActive: number;
}

const Tabs: FC<tabsProps> = ({ tabs, defaultActive }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActive);
  return (
    <div>
      <div className="flex items-center">
        {tabs.map((tab, i) => (
          <button
            className={`btn-unstyled ${
              activeTabIndex === i && "font-semibold uppercase"
            }`}
            onClick={() => setActiveTabIndex(i)}
            key={i}
          >
            <h6>{tab.name}</h6>
          </button>
        ))}
      </div>
      <div className="bg-lightHighlight py-2 px-4">
        {tabs[activeTabIndex].element}
      </div>
    </div>
  );
};

export default Tabs;
