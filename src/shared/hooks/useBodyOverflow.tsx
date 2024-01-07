import { useEffect } from 'react';

interface useBodyOverflowProps {
  onClose?: () => void;
  showPadding?: boolean;
}

const useBodyOverflow = ({ onClose = () => {}, showPadding = true }: useBodyOverflowProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();

      if (e.key === 'Escape') {
        onClose();
      }
    };

    const hero = document.querySelector('.home-hero-bg-wrap .home-hero-bg-tiles');

    if (showPadding) {
      const paddingRigth = window.innerWidth - document.body.clientWidth;
      document.body.style.paddingRight = `${paddingRigth}px`;

      if (hero instanceof HTMLElement) {
        hero.style.backgroundPositionX = `calc(50% - ${paddingRigth / 2}px)`;
      }
    }

    document.body.style.overflowY = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (showPadding) {
        document.body.style.paddingRight = '0px';

        if (hero instanceof HTMLElement) {
          hero.style.backgroundPositionX = '50%';
        }
      }

      document.body.style.overflowY = 'scroll';

      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [];
};

export default useBodyOverflow;
