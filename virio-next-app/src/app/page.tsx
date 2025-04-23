import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import MemoryArchitectureChart from '@/components/MemoryArchitectureChart';
import SystemArchitectureChart from '@/components/SystemArchitectureChart';
// import MemoryTabs from '@/components/MemoryTabs'; // Keep commented out due to import issues

// Import styles for page-specific elements
import pageStyles from './page.module.css';

// Helper component to render SVGs safely
const SvgRenderer = ({ svgString }: { svgString: string }) => {
  // Basic sanitization (replace with a more robust library if needed)
  const sanitizedSvg = svgString.replace(/<script.*?>.*?<\/script>/gi, '');
  return <div dangerouslySetInnerHTML={{ __html: sanitizedSvg }} />;
};

// SVG content from the document (First SVG - Corrected)
const tripleLayerMemorySvg = `
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
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="90" y="175" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Chronological stories</text>
  <text x="90" y="195" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Emotional tagging (Plutchik)</text>
  <text x="90" y="215" fontFamily="Arial" fontSize="12" fill="#2e7d32">• 768-dimension embeddings</text>
  <rect x="300" y="130" width="200" height="90" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="400" y="155" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Voice Pattern Module</text>
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="310" y="175" fontFamily="Arial" fontSize="12" fill="#2e7d32">• XLNet language model</text>
  <text x="310" y="195" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Stylistic fingerprinting</text>
  <text x="310" y="215" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Humor & rhetoric patterns</text>
  <rect x="520" y="130" width="200" height="90" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="620" y="155" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Value Framework</text>
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="530" y="175" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Core beliefs & positions</text>
  <text x="530" y="195" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Ethical guardrails</text>
  <text x="530" y="215" fontFamily="Arial" fontSize="12" fill="#2e7d32">• Constitutional AI rules</text>
  {/* Agent-Centric Layer */}
  <rect x="50" y="260" width="700" height="160" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" />
  <text x="400" y="290" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#1565c0">Agent-Centric Layer</text>
  <rect x="80" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="180" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Knowledge Graph</text>
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="90" y="355" fontFamily="Arial" fontSize="12" fill="#1565c0">• Neo4j with 58 entity types</text>
  <text x="90" y="375" fontFamily="Arial" fontSize="12" fill="#1565c0">• Schema.org alignment</text>
  <text x="90" y="395" fontFamily="Arial" fontSize="12" fill="#1565c0">• 3.2M relationship edges/client</text>
  <rect x="300" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="400" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Structured Data Store</text>
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="310" y="355" fontFamily="Arial" fontSize="12" fill="#1565c0">• JSON-LD templates</text>
  <text x="310" y="375" fontFamily="Arial" fontSize="12" fill="#1565c0">• W3C-validated schemas</text>
  <text x="310" y="395" fontFamily="Arial" fontSize="12" fill="#1565c0">• API endpoint mappings</text>
  <rect x="520" y="310" width="200" height="90" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="620" y="335" fontFamily="Arial" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1565c0">Parseable Content Library</text>
  {/* Adjusted x and removed text-anchor for left alignment */}
  <text x="530" y="355" fontFamily="Arial" fontSize="12" fill="#1565c0">• Metadata-rich templates</text>
  <text x="530" y="375" fontFamily="Arial" fontSize="12" fill="#1565c0">• Crawl-optimized patterns</text>
  <text x="530" y="395" fontFamily="Arial" fontSize="12" fill="#1565c0">• Task completion hooks</text>
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
  <path d="M400 240 L400 260" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
  <path d="M400 420 L400 440" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
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
`;

// Corrected SVG string with left-aligned text in boxes (Second SVG)
const enhancedSystemArchitectureSvg = `
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  {/* Background */}
  <rect width="800" height="600" fill="#f8f9fa" />
  {/* Title */}
  <text x="400" y="40" fontFamily="Arial" fontSize="24" textAnchor="middle" fontWeight="bold" fill="#2c3e50">Virio Dual-Audience System Flow</text>
  {/* Data Ingestion */}
  <rect x="50" y="80" width="700" height="80" rx="10" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" />
  <text x="400" y="105" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#1565c0">Data Ingestion</text> {/* Adjusted Y */}
  <rect x="70" y="115" width="130" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="75" y="140" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#1565c0">Client Data</text> {/* Corrected */}
  <rect x="220" y="115" width="130" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="225" y="140" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#1565c0">Interview Transcripts</text> {/* Corrected */}
  <rect x="370" y="115" width="130" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="375" y="140" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#1565c0">Trend Data</text> {/* Corrected */}
  <rect x="520" y="115" width="130" height="40" rx="5" fill="#bbdefb" stroke="#1565c0" strokeWidth="1" />
  <text x="525" y="140" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#1565c0">External Sources</text> {/* Corrected */}
  {/* Processing & Feature Extraction */}
  <rect x="50" y="180" width="700" height="120" rx="10" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2" />
  <text x="400" y="205" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#2e7d32">Processing & Feature Extraction</text> {/* Adjusted Y */}
  <rect x="70" y="225" width="160" height="50" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="75" y="255" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#2e7d32">NLP Pipeline</text> {/* Corrected */}
  <rect x="250" y="225" width="160" height="50" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="255" y="255" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#2e7d32">Client Modeling</text> {/* Corrected */}
  <rect x="430" y="225" width="160" height="50" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="435" y="255" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#2e7d32">Trend Analysis</text> {/* Corrected */}
  <rect x="610" y="225" width="120" height="50" rx="5" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1" />
  <text x="615" y="255" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#2e7d32">Feature Store</text> {/* Corrected */}
  {/* Triple-Layer Memory */}
  <rect x="50" y="320" width="700" height="80" rx="10" fill="#fff3e0" stroke="#e65100" strokeWidth="2" />
  <text x="400" y="360" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#e65100">Triple-Layer Memory Interface</text>
  {/* Generation Services */}
  <rect x="50" y="420" width="700" height="80" rx="10" fill="#f3e5f5" stroke="#6a1b9a" strokeWidth="2" />
  <text x="400" y="445" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#6a1b9a">Dual-Path Generation Services</text> {/* Adjusted Y */}
  <rect x="100" y="460" width="280" height="35" rx="5" fill="#e1bee7" stroke="#6a1b9a" strokeWidth="1" /> {/* Adjusted Y/Height */}
  <text x="105" y="483" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#6a1b9a">Human-Optimized Generator</text> {/* Corrected */}
  <rect x="420" y="460" width="280" height="35" rx="5" fill="#e1bee7" stroke="#6a1b9a" strokeWidth="1" /> {/* Adjusted Y/Height */}
  <text x="425" y="483" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#6a1b9a">Agent-Optimized Generator</text> {/* Corrected */}
  {/* API Endpoints */}
  <rect x="50" y="520" width="700" height="60" rx="10" fill="#e0f7fa" stroke="#006064" strokeWidth="2" />
  <text x="400" y="555" fontFamily="Arial" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#006064">Dual API Layer</text>
  {/* Connection arrows */}
  <path d="M400 160 L400 180" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
  <path d="M400 300 L400 320" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  <path d="M400 400 L400 420" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  <path d="M400 500 L400 520" stroke="#333" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  {/* Arrow definitions */}
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#333"/>
    </marker>
  </defs>
</svg>
`;


// Code block content
const ragPseudocode = `
# Pseudocode for the dual-path RAG orchestrator
def retrieve_context(query, content_type, audience_balance):
    # Human-centric context retrieval
    human_context = []
    if audience_balance["human"] > 0:
        experiences = semantic_search(experience_bank, query, top_k=5)
        voice_patterns = retrieve_voice_patterns(client_id)
        values = retrieve_value_framework(client_id)
        human_context = {
            "experiences": experiences,
            "voice": voice_patterns,
            "values": values
        }

    # Agent-centric context retrieval
    agent_context = []
    if audience_balance["agent"] > 0:
        entities = graph_query(knowledge_graph, query)
        schemas = retrieve_relevant_schemas(content_type)
        parseables = get_parseable_templates(content_type)
        agent_context = {
            "entities": entities,
            "schemas": schemas,
            "templates": parseables
        }

    # Trend context retrieval (relevant to both)
    trend_context = retrieve_trending_topics(query)

    # Blend contexts based on audience balance
    final_context = blend_contexts(
        human_context,
        agent_context,
        trend_context,
        audience_balance
    )

    return final_context
`;

const viralFeedJson = `
{
  "trend_id": "xq392",
  "velocity": 0.88,
  "timestamp": "2025-04-15T14:22:30Z",
  "associated_entities": ["AI ethics", "generative models"],
  "engagement_patterns": {
    "hooks": ["controversy", "future_impact"],
    "formats": ["short_video", "infographic"]
  },
  "embedding": [0.12, -0.45, ..., 0.77]
}
`;

const humanApiRequest = `
{
  "transcript": "string (required) - Content interview transcript",
  "platform": "string (optional) - Target platform (default: 'video')",
  "duration": "integer (optional) - Target duration in seconds",
  "audience_balance": {
    "human": 0.8,  // Balance between human and agent optimization
    "agent": 0.2
  },
  "topic_focus": "string (optional) - Specific topic to highlight",
  "style_parameters": {
    "energy_level": "string (optional) - e.g., 'high', 'conversational'",
    "formality": "string (optional) - e.g., 'casual', 'professional'"
  }
}
`;

const humanApiResponse = `
{
  "script_id": "string - Unique identifier",
  "script_content": "string - The generated video script",
  "talking_points": ["array - Key points covered"],
  "authenticity_score": 0.87,
  "references": ["ctx1", "ctx2"],  // Source context references
  "metadata": {
    "schema_completeness": 0.92,
    "estimated_duration": 62,
    "suggested_b_roll": ["image1.jpg", "clip2.mp4"]
  }
}
`;

const agentApiRequest = `
{
  "transcript": "string (required) - Content interview transcript",
  "platform": "string (optional) - Target platform",
  "audience_balance": {
    "human": 0.6,
    "agent": 0.4
  },
  "length": "string (optional) - e.g., 'brief', 'standard', 'detailed'",
  "structured_data_level": "string (optional) - e.g., 'minimal', 'standard', 'complete'"
}
`;

const agentApiResponse = `
{
  "post_id": "string - Unique identifier",
  "post_content": "string - The generated text",
  "structured_data": {
    "json_ld": "string - Schema-compliant JSON-LD",
    "metadata": {/* Platform-specific metadata */}
  },
  "authenticity_score": 0.85,
  "parseability_score": 0.94,
  "suggested_hashtags": ["#Topic1", "#Industry"]
}
`;


export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Virio Dual-Audience Content Personalization System"
        subtitle="Enhanced Design Combining Meta-Version & Super-Meta Systems"
      />
      <main>
        <Container className={pageStyles.mainContainer}>

          {/* Executive Summary */}
          <Section id="executive-summary" title="Executive Summary">
            <p>In an era where AI-generated content proliferates and AI agents increasingly consume content alongside humans, Virio's competitive moat depends on a sophisticated dual-audience framework. This system leverages the ineffably human qualities of authenticity, character, and emotional resonance while simultaneously optimizing for machine parsing and agent consumption. Based on analysis of industry case studies and emerging research, this enhanced system combines hybrid memory architecture, parallel KPI tracking, and structured data pipelines to serve both audiences effectively.</p>
            {/* Cards could represent key pillars */}
            <div className={pageStyles.cardContainer}>
              <Card
                icon={<div className={pageStyles.cardIcon}>📊</div>}
                title="Bifurcated KPIs"
                description="Separate metrics for human & agent success"
              />
              <Card
                icon={<div className={pageStyles.cardIcon}>🧠</div>}
                title="Triple-Layer Memory"
                description="Human, Agent, and Trend context"
              />
              <Card
                icon={<div className={pageStyles.cardIcon}>⚙️</div>}
                title="Dual-Path RAG"
                description="Optimized retrieval for both audiences"
              />
              <Card
                icon={<div className={pageStyles.cardIcon}>🔌</div>}
                title="Dual API Layer"
                description="Endpoints for narrative & structured data"
              />
            </div>
          </Section>

          {/* Section 1: KPIs */}
          <Section id="kpis" title="1. Bifurcated KPI Framework: Human + Agent Metrics">
            <h3>Human-Centric KPIs</h3>
            <div className={pageStyles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Definition</th>
                    <th>Measurement</th>
                    <th>Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Resonance Score</strong></td><td>Sentiment-weighted engagement combined with discourse analysis</td><td>IBM Watson Tone Analyzer + Custom NLP</td><td>0.82</td></tr>
                  <tr><td><strong>Identity Alignment</strong></td><td>BERT-based classification of voice pattern consistency</td><td>Custom classifier</td><td>87% accuracy</td></tr>
                  <tr><td><strong>Engagement Depth</strong></td><td>Active participation metrics (comments, saves, replies per view)</td><td>Platform Analytics</td><td>2.3× industry avg</td></tr>
                  <tr><td><strong>Conversation Generation</strong></td><td>Number of discussion threads that spark meaningful debate</td><td>Custom Thread Analysis</td><td>3.4 threads/post</td></tr>
                  <tr><td><strong>Retention Cohort Rate</strong></td><td>Percentage of return viewers/readers over successive posts</td><td>Custom Attribution</td><td>42% retention</td></tr>
                  <tr><td><strong>Content Half-Life</strong></td><td>Time until engagement decays by 50% (median 18 days for human content)</td><td>Decay Analysis</td><td>18+ days</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Agent-Optimized KPIs</h3>
            <div className={pageStyles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Definition</th>
                    <th>Measurement</th>
                    <th>Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Schema Completeness</strong></td><td>Richness of JSON-LD markup and structured data</td><td>W3C Validation Tools</td><td>94% completion</td></tr>
                  <tr><td><strong>Task Completion Rate</strong></td><td>API call success percentages for automated workflows</td><td>API Analytics</td><td>97% success</td></tr>
                  <tr><td><strong>Crawl Frequency</strong></td><td>Maintenance of agent attention over time</td><td>Crawl Analytics</td><td>73% at 42 days</td></tr>
                  <tr><td><strong>Data Parseability</strong></td><td>Ease of extracting structured information</td><td>Parser Success Rate</td><td>4.7 endpoints/post</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Section 2: Memory */}
          <Section id="memory" title="2. Triple-Layer Memory Architecture">
            <p>This architecture integrates distinct memory types to cater to both human and agent needs, overlaid with real-time context.</p>
            
            {/* Replace SVG with the React component */}
            <MemoryArchitectureChart className={pageStyles.memoryChart} />
            
            {/* Additional details below the chart */}
            <div className={pageStyles.memoryLayerDetails}>
              <h3>2.1 Human-Centric Layer</h3>
              <ul>
                <li><strong>Experience Memory Bank</strong>: Vectorized narrative experiences (768-dimension embeddings), Emotional tagging using Plutchik's wheel, Chronological storytelling hooks.</li>
                <li><strong>Voice Pattern Module</strong>: XLNet-based client language models, Linguistic fingerprinting (syntax, vocabulary, cadence), Humor patterns, rhetorical devices.</li>
                <li><strong>Value Framework</strong>: Core beliefs and position mapping, Ethical guardrails and constitutional AI principles, Brand voice guidelines.</li>
              </ul>
              <h3>2.2 Agent-Centric Layer</h3>
              <ul>
                <li><strong>Knowledge Graph</strong>: Neo4j implementation with 58 schema.org entity types, Maintaining 3.2M relationship edges per client (average), Structured relationships.</li>
                <li><strong>Structured Data Store</strong>: JSON-LD templates and metadata frameworks, W3C-validated schema definitions, API endpoint mappings.</li>
                <li><strong>Parseable Content Library</strong>: Metadata-rich content templates, Crawl-optimized content patterns, Task completion hooks.</li>
              </ul>
              <h3>2.3 Trend & Context Overlay</h3>
              <ul>
                <li><strong>Real-time Trend Analysis</strong>: Kafka streams of viral content patterns, Topic velocity tracking with predictive modeling, Contextual matching using cosine similarity.</li>
              </ul>
            </div>
          </Section>

          {/* Section 3: RAG */}
          <Section id="rag" title="3. Dual-Path Retrieval Augmented Generation">
            <p>The RAG orchestrator dynamically retrieves and blends context from the memory layers based on the target audience and content type.</p>
            <pre className={pageStyles.codeBlock}><code>{ragPseudocode}</code></pre>
            <p>This approach has demonstrated a 42% reduction in hallucination rates compared to single-mode retrieval systems while maintaining authenticity scores above 0.87.</p>
          </Section>

          {/* Section 4: Data Sources */}
          <Section id="data-sources" title="4. Data Sources & Transformation Pipeline">
            <h3>Client-Provided Data</h3>
            <div className={pageStyles.tableContainer}>
              <table>
                <thead>
                  <tr><th>Data Type</th><th>Human Processing</th><th>Agent Processing</th></tr>
                </thead>
                <tbody>
                  <tr><td>Interviews & Transcripts</td><td>Raw text with vocal cues</td><td>Speaker-diarized JSON timelines</td></tr>
                  <tr><td>Past Content Archive</td><td>Engagement & sentiment analysis</td><td>Structured metadata extraction</td></tr>
                  <tr><td>CRM & Email Data</td><td>Relationship narratives</td><td>Contact graphs & interaction models</td></tr>
                  <tr><td>Personal Journals</td><td>Contextual life events</td><td>Entity-linked timelines</td></tr>
                  <tr><td>Professional Materials</td><td>Style & expertise indicators</td><td>Domain knowledge extraction</td></tr>
                </tbody>
              </table>
            </div>
            <h3>External & Enrichment Sources</h3>
            <ul>
              <li><strong>Viral Content Feed (Black Box JSON)</strong>: Provides trend velocity, associated entities, engagement patterns, and embeddings.</li>
              <pre className={pageStyles.codeBlock}><code>{viralFeedJson}</code></pre>
              <li><strong>Audience Analytics</strong>: Demographic profiles, sentiment trends, platform preferences.</li>
              <li><strong>Competitor Benchmarks</strong>: Style analysis, cadence patterns, format effectiveness.</li>
              <li><strong>Topic Velocity Tracking</strong>: Trend prediction models, conversation lifecycle analysis.</li>
            </ul>
          </Section>

          {/* Section 5: System Architecture */}
          <Section id="architecture" title="5. Enhanced System Architecture">
            <p>The overall system flow integrates data ingestion, processing, memory access, and dual-path generation.</p>
            
            {/* Replace SVG with React component */}
            <SystemArchitectureChart className={pageStyles.systemChart} />
          </Section>

          {/* Section 6: API Endpoints */}
          <Section id="api-endpoints" title="6. Enhanced API Endpoints">
            <h3>Human-Narrative APIs</h3>
            <p><code>POST /api/v1/script</code> (Requires API Key)</p>
            <h4>Request Payload:</h4>
            <pre className={pageStyles.codeBlock}><code>{humanApiRequest}</code></pre>
            <h4>Response:</h4>
            <pre className={pageStyles.codeBlock}><code>{humanApiResponse}</code></pre>

            <h3>Agent-Optimized APIs</h3>
            <p><code>POST /api/v1/text</code> (Requires API Key)</p>
            <h4>Request Payload:</h4>
            <pre className={pageStyles.codeBlock}><code>{agentApiRequest}</code></pre>
            <h4>Response:</h4>
            <pre className={pageStyles.codeBlock}><code>{agentApiResponse}</code></pre>
          </Section>

          {/* Section 7: Implementation */}
          <Section id="implementation" title="7. Implementation Strategy & Roadmap">
            <h3>Phase 1: Foundation (Q3 2025)</h3>
            <ul><li>Deploy vector database for experience memory</li><li>Implement initial knowledge graph with core schema.org entities</li><li>Build voice pattern analysis MVP</li><li>Release basic dual API endpoints</li></ul>
            <h3>Phase 2: Enrichment (Q1 2026)</h3>
            <ul><li>Launch dual KPI dashboards</li><li>Integrate trend detection system</li><li>Expand knowledge graph to full 58 entity types</li><li>Deploy enhanced RAG orchestrator with dual paths</li></ul>
            <h3>Phase 3: Optimization (Q4 2026)</h3>
            <ul><li>Achieve 50% automated content personalization</li><li>Implement full schema validation pipeline</li><li>Launch agent viewership analytics</li><li>Develop advanced authenticity metrics</li></ul>
          </Section>

          {/* Section 8: Strategic Implications */}
          <Section id="implications" title="8. The Post-Human Content Landscape: Strategic Implications">
            <h3>Agent Viewership Dynamics</h3>
            <ol>
              <li><strong>Differentiated Consumption</strong>: Agents prefer higher info density, complex models, longer forms.</li>
              <li><strong>Measurement Challenges</strong>: View counts become less meaningful; need anti-homogenization metrics & new attribution models.</li>
              <li><strong>Strategic Content Mix</strong>: Format Evolution Matrix, Dynamic Auditing (engagement + parseability), Anti-Homogenization Tactics.</li>
            </ol>
            <h3>The Future of B2B Content</h3>
            <ol>
              <li><strong>Premium on Authenticity</strong>: Story-driven content commands premiums; trust remains key.</li>
              <li><strong>Dual-Audience Strategy</strong>: "Bilingual" content needed for human decision-makers & agent intermediaries.</li>
              <li><strong>Long-Term Evolution</strong>: Shift from broadcasts to narratives/insight feeds; agents curate, humans decide.</li>
            </ol>
          </Section>

          {/* Section 9: Conclusion */}
          <Section id="conclusion" title="9. Conclusion: Building the Authenticity Moat">
             <p>Virio's dual-audience framework represents a systematic approach to creating an authenticity moat by combining:</p>
             <ol>
               <li><strong>Human-Centric Depth</strong>: Experience memory, voice patterns, value frameworks.</li>
               <li><strong>Agent-Ready Structure</strong>: Knowledge graphs, structured data, parseability.</li>
               <li><strong>Real-Time Adaptation</strong>: Trend monitoring, context-aware generation.</li>
               <li><strong>Measurable Quality</strong>: Separate KPIs for human and agent engagement.</li>
             </ol>
             <p>This system positions Virio at the critical intersection of human authenticity and machine efficiency, creating a sustainable competitive advantage.</p>
          </Section>

        </Container>
      </main>
      <Footer />
    </>
  );
}
