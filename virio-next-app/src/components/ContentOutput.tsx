import React from 'react';
import { HumanOutput, AgentOutput } from '@/lib/mockData'; // Import interfaces
import EmotionalText from './EmotionalText';
import AuthenticityBadge from './AuthenticityBadge';
import SchemaViewer from './SchemaViewer';
import ParseabilityIndicator from './ParseabilityIndicator';

interface DualOutputProps {
  humanContent: HumanOutput;
  agentContent: AgentOutput;
  balance: number; // Human weight (0 to 1)
}

const ContentOutput: React.FC<DualOutputProps> = ({ humanContent, agentContent, balance }) => {
  // Calculate opacity and background color based on balance
  // Ensure opacity stays within a reasonable range (e.g., 0.5 to 1)
  const humanOpacity = 0.5 + (balance * 0.5);
  const agentOpacity = 0.5 + ((1 - balance) * 0.5);

  // Use HSL for smoother color transition (Orange to Blue)
  // Hue: Orange (~40) to Blue (~210)
  // Saturation: Keep high (e.g., 90%)
  // Lightness: Keep consistent (e.g., 60%)
  // Alpha: Controlled by balance
  const humanBgColor = `hsla(40, 90%, 60%, ${balance})`;
  const agentBgColor = `hsla(210, 90%, 60%, ${1 - balance})`;

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* Human-Optimized Panel */}
      <div
        className="p-6 rounded-lg shadow-lg border border-orange-200 dark:border-orange-800 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: humanBgColor,
          opacity: humanOpacity
        }}
      >
        <h3 className="text-2xl font-serif mb-4 font-semibold text-orange-900 dark:text-orange-100">
          Human-Optimized
        </h3>
        <EmotionalText content={humanContent.narrative} tags={humanContent.emotionalTags} />
        <AuthenticityBadge score={humanContent.authenticityScore} />
        <div className="mt-3 text-sm text-orange-800 dark:text-orange-200">
          Predicted Engagement: {humanContent.engagementMetrics.predictedComments} comments, {humanContent.engagementMetrics.shares} shares
        </div>
      </div>

      {/* Agent-Optimized Panel */}
      <div
        className="p-6 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: agentBgColor,
          opacity: agentOpacity
        }}
      >
        <h3 className="text-2xl font-mono mb-4 font-semibold text-blue-900 dark:text-blue-100">
          Agent-Optimized
        </h3>
        <SchemaViewer data={agentContent.jsonLd} />
        <ParseabilityIndicator score={agentContent.parseabilityScore} />
         <div className="mt-3 text-sm text-blue-800 dark:text-blue-200">
          Extracted Entities: {agentContent.entities.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default ContentOutput;
