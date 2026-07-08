import React from 'react';

export default function Skeleton({ className = '', variant = 'text', count = 1 }) {
  const getShapeClass = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'card':
        return 'rounded-3xl h-32 w-full';
      case 'text':
      default:
        return 'rounded-lg h-4 w-full';
    }
  };

  const skeletons = Array.from({ length: count });

  return (
    <div className="space-y-2.5 w-full">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 dark:bg-white/5 ${getShapeClass()} ${className}`}
        />
      ))}
    </div>
  );
}
