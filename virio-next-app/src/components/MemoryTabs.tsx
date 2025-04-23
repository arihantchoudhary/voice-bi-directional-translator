"use client"; // Required for interactive components like Tabs

import React from 'react';
// Revert to original import style
import { Tabs } from '@base-ui-components/react';
import styles from './MemoryTabs.module.css';

const MemoryTabs = () => {
  return (
    <div className={styles.memoryArchitectureContainer}>
      {/* Embed the SVG directly */}
      <div className={styles.svgContainer}>
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="800" height="600" fill="#f8f9fa" />

          {/* Title */}
          <text x="400" y="40" fontFamily="Arial" fontSize="24" textAnchor="middle" fontWeight="bold" fill="#2c3e50">Virio Triple-Layer Memory Architecture</text>

          {/* Human-Centric Layer */}
          <rect x="50" y="80" width="700" height="160" rx="10" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2" />
          <text x="400" y="110" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Human-Centric Layer</text>

          <rect x="80" y="130" width="200" height="90" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
          <text x="180" y="155" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Experience Memory Bank</text>
          <text x="180" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Chronological stories</text>
          <text x="180" y="195" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Emotional tagging (Plutchik)</text>
          <text x="180" y="215" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• 768-dimension embeddings</text>

          <rect x="300" y="130" width="200" height="90" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
          <text x="400" y="155" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Voice Pattern Module</text>
          <text x="400" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• XLNet language model</text>
          <text x="400" y="195" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Stylistic fingerprinting</text>
          <text x="400" y="215" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Humor & rhetoric patterns</text>

          <rect x="520" y="130" width="200" height="90" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
          <text x="620" y="155" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Value Framework</text>
          <text x="620" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Core beliefs & positions</text>
          <text x="620" y="195" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Ethical guardrails</text>
          <text x="620" y="215" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#2e7d32">• Constitutional AI rules</text>

          {/* Agent-Centric Layer */}
          <rect x="50" y="260" width="700" height="160" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" />
          <text x="400" y="290" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#1565c0">Agent-Centric Layer</text>

          <rect x="80" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
          <text x="180" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Knowledge Graph</text>
          <text x="180" y="355" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• Neo4j with 58 entity types</text>
          <text x="180" y="375" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• Schema.org alignment</text>
          <text x="180" y="395" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• 3.2M relationship edges/client</text>

          <rect x="300" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
          <text x="400" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Structured Data Store</text>
          <text x="400" y="355" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• JSON-LD templates</text>
          <text x="400" y="375" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• W3C-validated schemas</text>
          <text x="400" y="395" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• API endpoint mappings</text>

          <rect x="520" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
          <text x="620" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Parseable Content Library</text>
          <text x="620" y="355" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• Metadata-rich templates</text>
          <text x="620" y="375" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• Crawl-optimized patterns</text>
          <text x="620" y="395" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#1565c0">• Task completion hooks</text>

          {/* Trend & Context Layer */}
          <rect x="50" y="440" width="700" height="120" rx="10" fill="#fff3e0" stroke="#e65100" strokeWidth="2" />
          <text x="400" y="470" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#e65100">Trend & Context Overlay</text>

          <rect x="80" y="490" width="200" height="50" rx="5" fill="#ffe0b2" stroke="#e65100" strokeWidth="1" />
          <text x="180" y="520" fontFamily="Arial" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#e65100">Viral Content Feeds</text>

          <rect x="300" y="490" width="200" height="50" rx="5" fill="#ffe0b2" stroke="#e65100" strokeWidth="1" />
          <text x="400" y="520" fontFamily="Arial" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#e65100">Topic Velocity Tracking</text>

          <rect x="520" y="490" width="200" height="50" rx="5" fill="#ffe0b2" stroke="#e65100" strokeWidth="1" />
          <text x="620" y="520" fontFamily="Arial" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#e65100">Kafka Real-time Streams</text>

          {/* Connection arrows */}
          {/* From Human to RAG */}
          <path d="M400 240 L400 260" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

          {/* From Agent to RAG */}
          <path d="M400 420 L400 440" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

          {/* From Trend to APIs */}
          <path d="M400 560 L400 580" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

          {/* RAG System */}
          <rect x="300" y="570" width="200" height="60" rx="10" fill="#e1bee7" stroke="#6a1b9a" strokeWidth="2" />
          <text x="400" y="605" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#6a1b9a">Dual-Path RAG Orchestrator</text>

          {/* Arrow definitions */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#333"/>
            </marker>
          </defs>
        </svg>
      </div>

      {/* Revert to original dot notation */}
      <Tabs.Root defaultValue="human-centric" className={styles.tabsRoot}>
        <Tabs.List className={styles.tabsList} aria-label="Memory Architecture Layers">
          <Tabs.Trigger value="human-centric" className={styles.tabsTrigger}>
            Human-Centric Layer
          </Tabs.Trigger>
          <Tabs.Trigger value="agent-centric" className={styles.tabsTrigger}>
            Agent-Centric Layer
          </Tabs.Trigger>
          <Tabs.Trigger value="trend-context" className={styles.tabsTrigger}>
            Trend & Context Overlay
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="human-centric" className={styles.tabsContent}>
          <h4>Human-Centric Layer</h4>
          <p>Focuses on capturing the nuances of human experience and communication style.</p>
          <ul>
            <li><strong>Experience Memory Bank</strong>: Stores vectorized narrative experiences (768-dim embeddings), emotional tags (Plutchik's wheel), and chronological storytelling hooks.</li>
            <li><strong>Voice Pattern Module</strong>: Uses XLNet models for linguistic fingerprinting (syntax, vocabulary, cadence), humor patterns, and rhetorical devices.</li>
            <li><strong>Value Framework</strong>: Maps core beliefs, positions, ethical guardrails (Constitutional AI), and brand voice guidelines.</li>
          </ul>
        </Tabs.Content>

        <Tabs.Content value="agent-centric" className={styles.tabsContent}>
          <h4>Agent-Centric Layer</h4>
          <p>Optimizes content for machine parsing and automated workflows.</p>
          <ul>
            <li><strong>Knowledge Graph</strong>: Neo4j implementation with 58 schema.org entity types, averaging 3.2M relationship edges per client, structuring concepts and products.</li>
            <li><strong>Structured Data Store</strong>: Provides JSON-LD templates, W3C-validated schemas, and API endpoint mappings.</li>
            <li><strong>Parseable Content Library</strong>: Contains metadata-rich templates, crawl-optimized patterns, and task completion hooks.</li>
          </ul>
        </Tabs.Content>

        <Tabs.Content value="trend-context" className={styles.tabsContent}>
          <h4>Trend & Context Overlay</h4>
          <p>Provides real-time awareness of the broader content landscape.</p>
          <ul>
            <li><strong>Real-time Trend Analysis</strong>: Ingests Kafka streams of viral content patterns.</li>
            <li><strong>Topic Velocity Tracking</strong>: Uses predictive modeling to track topic momentum.</li>
            <li><strong>Contextual Matching</strong>: Employs cosine similarity to link trends with client history.</li>
          </ul>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default MemoryTabs;
