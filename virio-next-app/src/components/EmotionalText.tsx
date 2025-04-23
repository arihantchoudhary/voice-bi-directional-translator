import React from 'react';

interface EmotionalTextProps {
  content: string;
  tags: string[];
}

// Basic placeholder - actual highlighting logic would be complex
const EmotionalText: React.FC<EmotionalTextProps> = ({ content, tags }) => {
  return (
    <div className="mb-4">
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
      <div className="mt-2 text-sm text-orange-600 dark:text-orange-400">
        Emotional Tags: {tags.join(', ')}
      </div>
    </div>
  );
};

export default EmotionalText;
