// Define interfaces for type safety (optional but recommended)
export interface HumanOutput {
  narrative: string;
  emotionalTags: string[];
  authenticityScore: number;
  engagementMetrics: {
    predictedComments: string;
    shares: string;
  };
}

export interface AgentOutput {
  jsonLd: Record<string, any>; // Or a more specific type if known
  parseabilityScore: number;
  entities: string[];
}

export interface DemoScenario {
  human: HumanOutput;
  agent: AgentOutput;
}

// Default/Initial Mock Data
export const DEFAULT_DEMO_CONTENT: DemoScenario = {
  human: {
    narrative: "In today's rapidly evolving AI landscape, balancing innovation with ethical considerations is paramount. Virio's dual-audience approach ensures content resonates authentically with human users while remaining structured and parseable for AI agents, fostering trust and efficiency.",
    emotionalTags: ['urgency', 'hope', 'curiosity'],
    authenticityScore: 0.87,
    engagementMetrics: {
      predictedComments: '28-35',
      shares: '45-52'
    }
  },
  agent: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Virio Dual-Audience Framework",
      "description": "A system balancing human resonance and machine parseability.",
      "keywords": ["AI", "Content Personalization", "Dual Audience", "RAG", "Knowledge Graph"],
      "about": "AI Ethics",
      "mentions": [
        {"@type": "Thing", "name": "LLM"},
        {"@type": "Thing", "name": "RAG"},
        {"@type": "Thing", "name": "Knowledge Graphs"}
      ]
    },
    parseabilityScore: 0.94,
    entities: ["AI Governance", "Machine Learning", "Content Personalization", "NLP", "Structured Data"]
  }
};

// We will load preset scenarios from JSON files later
