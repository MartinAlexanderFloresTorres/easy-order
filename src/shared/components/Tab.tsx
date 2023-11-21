import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabNavigation {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface TabProps {
  tab: TabNavigation;
}

let debounceTimerReaction: NodeJS.Timeout | null = null;

const Tab = ({ tab }: TabProps) => {
  const { pathname } = useLocation();
  const [showReaction, setShowReaction] = useState(false);

  const activeTab = (path: string) =>
    pathname === path
      ? 'text-pink-500 border-b-4 border-b-pink-500 hover:border-b-pink-600'
      : 'sm:hover:border-b-pink-500 border-b-4 border-b-transparent';

  const openReaction = () => {
    if (debounceTimerReaction) clearTimeout(debounceTimerReaction);
    debounceTimerReaction = setTimeout(() => {
      setShowReaction(true);
    }, 500);
  };

  const closeReaction = () => {
    if (debounceTimerReaction) clearTimeout(debounceTimerReaction);

    debounceTimerReaction = setTimeout(() => {
      setShowReaction(false);
    }, 300);
  };

  return (
    <Link
      to={tab.url}
      className={twMerge('flex-1 transition-colors duration-300', activeTab(tab.url))}
      onTouchStart={() => openReaction()}
      onTouchEnd={() => closeReaction()}
    >
      <div className="relative group flex-1 flex gap-2 items-center justify-center px-3 py-2 text-center transition-colors duration-300 text-xs font-semibold">
        {tab.icon}
        <span
          className={twMerge(
            'sm:text-current text-white text-xs leading-none border sm:border-none border-zinc-700 border-opacity-30 opacity-0 sm:opacity-100 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute sm:static left-1/2 -translate-x-1/2 sm:transform-none sm:transition-none bg-zinc-800 sm:bg-transparent px-3 py-1 sm:p-0 rounded-md sm:rounded-none transition-all duration-200',
            showReaction ? 'sm:opacity-0 opacity-100' : 'hidden sm:block ',
          )}
        >
          {tab.title}
        </span>
      </div>
    </Link>
  );
};

export default Tab;
