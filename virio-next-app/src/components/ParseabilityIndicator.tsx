import React from 'react';

interface ParseabilityIndicatorProps {
  score: number;
}

const ParseabilityIndicator: React.FC<ParseabilityIndicatorProps> = ({ score }) => {
  const percentage = (score * 100).toFixed(0);
   // Basic color logic
  const colorClass = score > 0.9 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                   : score > 0.7 ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                   : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';

  return (
    <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${colorClass}`}>
      Parseability: {percentage}%
    </div>
  );
};

export default ParseabilityIndicator;
