import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface CounterProps {
  children?: React.ReactNode;
  countState?: number;
  updateCount?: (count: number) => void;
  onChange: (count: number) => void;
  min: number;
  max: number;
  onErrorMax?: () => void;
  onErrorMin?: () => void;
  className?: string;
  style?: React.CSSProperties;
  minDisabled?: boolean;
  maxDisabled?: boolean;
}

const Counter = ({
  children,
  minDisabled,
  maxDisabled,
  countState = 0,
  onChange,
  updateCount,
  min,
  max,
  onErrorMax,
  onErrorMin,
  className,
  style,
}: CounterProps) => {
  useEffect(
    () => {
      updateCount && updateCount(countState);
    } /* eslint-disable-next-line react-hooks/exhaustive-deps */,
    [countState],
  );

  const handleIncrement = () => {
    if (countState < max) {
      updateCount && updateCount(countState + 1);
      onChange(countState + 1);
    } else {
      onErrorMax && onErrorMax();
    }
  };

  const handleDecrement = () => {
    if (countState > min) {
      updateCount && updateCount(countState - 1);
      onChange(countState - 1);
    } else {
      onErrorMin && onErrorMin();
    }
  };

  return (
    <div className={twMerge('flex gap-2 items-center', className)} style={style}>
      <button
        type="button"
        className="whitespace-nowrap flex justify-center items-center min-w-[30px] min-h-[30px] w-[30px] h-[30px] bg-pink-600 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:hover:bg-pink-600 disabled:cursor-not-allowed disabled:text-zinc-400 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
        onClick={handleDecrement}
        disabled={minDisabled}
      >
        <Minus size={20} />
      </button>
      {children && children}
      <button
        type="button"
        className="whitespace-nowrap flex justify-center items-center min-w-[30px] min-h-[30px] w-[30px] h-[30px] bg-pink-600 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:hover:bg-pink-600 disabled:cursor-not-allowed disabled:text-zinc-400 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
        onClick={handleIncrement}
        disabled={maxDisabled}
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default Counter;
