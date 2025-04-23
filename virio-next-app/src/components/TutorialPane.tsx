import React from 'react';

const TutorialPane = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8 shadow-sm">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">About This Demo</h2>
      <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
        <p>
          <strong>The Challenge:</strong> In an era of increasing AI-generated content ("AI slop"), Virio aims to create a competitive advantage by producing highly personalized, authentic content that resonates deeply with human audiences while also being optimized for AI agents (like search crawlers or internal knowledge systems). This requires capturing and utilizing rich client context (experiences, voice, values).
        </p>
        <p>
          <strong>The System Design Task:</strong> The original assignment was to design an AI-native system for Virio. This involved defining KPIs for dual-audience success, designing a hybrid memory architecture (combining human experiences and structured knowledge), identifying necessary data sources, outlining data transformation pipelines, and specifying API endpoints for content generation. The full system design can be viewed on the <a href="/" className="text-blue-600 hover:underline dark:text-blue-400">main page</a>.
        </p>
        <p>
          <strong>This Demo's Purpose:</strong> This interactive demo simulates the core concept of the proposed system: the **dual-audience output**. It showcases how generated content might differ based on the target audience balance (Human vs. Agent).
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Use the **slider** to adjust the desired balance.</li>
          <li>Observe how the **Human-Optimized** panel (emphasizing narrative, emotion, authenticity) and the **Agent-Optimized** panel (emphasizing structured data, parseability) change in appearance and content based on the balance.</li>
          <li>Use the **preset buttons** to load mock data representing different content types (Thought Leadership, Product Announcement, API Docs) with typical audience balances.</li>
        </ul>
        <p>
          <em>Note: This demo uses pre-defined mock data. The actual Virio system would dynamically generate this content using its complex backend architecture and APIs. Features like emotional text highlighting, interactive schema viewing (Monaco), knowledge graph visualization (D3), and the guided tour (react-joyride) are placeholders here.</em>
        </p>
      </div>
    </div>
  );
};

export default TutorialPane;
