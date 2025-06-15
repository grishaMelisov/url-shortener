// components/SidebarNavigator.tsx
import { useState } from 'react';
import clsx from 'clsx';

interface SidebarNavigatorProps {
  items: {
    key: string;
    label: string;
    component: React.ReactNode;
  }[];
}

export default function SidebarNavigator({ items }: SidebarNavigatorProps) {
  const [selectedKey, setSelectedKey] = useState(items[0]?.key);

  const selectedItem = items.find((item) => item.key === selectedKey);

  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-ghost-white border-e border-smoky-black p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            className={clsx(
              'w-full text-left px-3 py-2 rounded transition active:bg-gray-300',
              selectedKey === item.key
                ? 'bg-gray-200 text-gray-800'
                : 'hover:bg-gray-200 text-gray-800'
            )}
            onClick={() => setSelectedKey(item.key)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6 overflow-y-auto explore-shell">
        {selectedItem?.component}
      </main>
    </div>
  );
}
