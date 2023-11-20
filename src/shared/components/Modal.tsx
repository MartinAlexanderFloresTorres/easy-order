import { twMerge } from 'tailwind-merge';
import useBodyOverflow from '@/shared/hooks/useBodyOverflow';
import Overlay from '@/shared/components/Overlay';

interface ModalProps {
  children: React.ReactNode;
  isClose: boolean;
  className?: string;
  onClose: () => void;
  style?: React.CSSProperties;
}

const Modal = ({ children, className = 'bg-zinc-900', isClose, onClose, style }: ModalProps) => {
  useBodyOverflow({ onClose });

  return (
    <div
      className={twMerge('fixed top-0 left-0 right-0 bottom-0 h-full min-h-full w-full overflow-auto z-50', className)}
      style={{
        animation: `${isClose ? 'fadeOut' : 'fadeIn'} 300ms ease-in-out`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Modal.Overlay = Overlay;

export default Modal;
