import React from 'react';
import Spinner from './Spinner';
import { twMerge } from 'tailwind-merge';

interface LoadingProps {
  title: string;
  description?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Loading = ({ title = 'Cargando', description = 'Espere un momento por favor ...', className, size = 40, style }: LoadingProps) => {
  return (
    <div className={twMerge('flex items-center justify-center animate-fade-in', className)} {...(style && { style })}>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
        <p className="text-sm text-center mb-6 animate-pulse">{description}</p>
        <Spinner size={size} className="mx-auto" />
      </div>
    </div>
  );
};

export default Loading;
