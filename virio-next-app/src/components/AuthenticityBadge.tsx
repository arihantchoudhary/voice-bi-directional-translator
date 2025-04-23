import React from 'react';

interface AuthenticityBadgeProps {
  score: number;
}

const AuthenticityBadge: React.FC<AuthenticityBadgeProps> = ({ score }) => {
  const percentage = (score * 100).toFixed(0);
  // Basic color logic - could be more sophisticated
  const colorClass = score > 0.8 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                   : score > 0.6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                   : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

  return (
    <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${colorClass}`}>
      Authenticity: {percentage}%
    </div>
  );
};

export default AuthenticityBadge;
