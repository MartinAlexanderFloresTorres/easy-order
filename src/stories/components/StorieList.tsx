import { useEffect, useRef, useState } from 'react';
import NewStorie from '@/stories/components/NewStorie';
import Storie from '@/stories/components/Storie';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SCROLL = 300;

const StorieList = () => {
  // ESTADOS
  const [scroll, setScroll] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // SCROLL REF
  const scrollRef = useRef<HTMLDivElement>(null);

  // EFFECTO
  useEffect(() => {
    if (!scrollRef.current) return;
    // KEYDOWN EVENT
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleScroll(-SCROLL);
      } else if (e.key === 'ArrowRight') {
        handleScroll(SCROLL);
      }
    };
    window.addEventListener('keydown', onKeydown);

    // SCROLL EVENT
    const onScroll = () => {
      const showPrevButton = scrollRef.current!.scrollLeft > 0;
      const showNextButton = scrollRef.current!.scrollLeft < scrollRef.current!.scrollWidth - scrollRef.current!.clientWidth;

      setShowPrevButton(showPrevButton);
      setShowNextButton(showNextButton);
    };
    onScroll();
    scrollRef.current.addEventListener('scroll', onScroll);

    return () => {
      if (scrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('keydown', onKeydown);
    };
  }, [scroll]);

  // HANDLE SCROLL
  const handleScroll = (scrollOffset: number) => {
    const element = scrollRef.current;
    if (element instanceof HTMLElement) {
      const newScrollLeft = element.scrollLeft + scrollOffset;

      element.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setScroll(newScrollLeft);
    }
  };

  return (
    <div className="container relative mx-auto p-4">
      {showPrevButton && (
        <button
          className="hidden md:flex absolute z-10 left-5 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-50 border border-zinc-800 border-opacity-40 backdrop-blur-sm w-7 h-7 rounded-full items-center justify-center"
          onClick={() => handleScroll(-SCROLL)}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="flex gap-2 overflow-x-auto scroll-view-hidden" style={{ WebkitOverflowScrolling: 'touch' }} ref={scrollRef}>
        <NewStorie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
        <Storie />
      </div>
      {showNextButton && (
        <button
          className="hidden md:flex absolute z-10 right-5 top-1/2 -translate-y-1/2 bg-zinc-800 bg-opacity-50 border border-zinc-800 border-opacity-40 backdrop-blur-sm w-7 h-7 rounded-full items-center justify-center"
          onClick={() => handleScroll(SCROLL)}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default StorieList;
