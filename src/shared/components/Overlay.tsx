import { twMerge } from 'tailwind-merge';

interface OverlayProps {
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Overlay = ({ onClose, className, children, disabled }: OverlayProps) => {
  return (
    <div
      className={twMerge('h-full min-h-full w-full overflow-auto flex flex-col items-center justify-center p-4', className)}
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
