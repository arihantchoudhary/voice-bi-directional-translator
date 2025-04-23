"use client"; // Required for state and effects

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import AudienceSlider from '@/components/AudienceSlider';
import ContentOutput from '@/components/ContentOutput';
import TutorialPane from '@/components/TutorialPane';
// Import interfaces, but default content might not be used if API loads first
import { DemoScenario, HumanOutput, AgentOutput, DEFAULT_DEMO_CONTENT } from '@/lib/mockData';

// Define preset keys type
type PresetKey = 'thought-leadership' | 'product-announcement' | 'api-documentation';

// Define API base URL (Flask server)
const API_BASE_URL = 'http://localhost:5001/api/v1';

const DemoPage = () => {
  const [balance, setBalance] = useState<number>(0.7); // Initial balance (70% human)
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(DEFAULT_DEMO_CONTENT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBalanceChange = useCallback((newBalance: number) => {
    setBalance(newBalance);
    // Here you might trigger analytics tracking (e.g., PostHog)
    // console.log("Balance changed:", newBalance);
  }, []);

  const loadPreset = async (preset: PresetKey) => {
    setIsLoading(true);
    setError(null);
    let apiUrl = '';
    let apiPayload: Record<string, any> = {
      transcript: `User selected preset: ${preset}`, // Dummy transcript
      topic_focus: preset.replace('-', ' ') // Use preset name as topic hint
    };

    // Determine API endpoint and specific payload based on preset
    if (preset === 'api-documentation') {
      apiUrl = `${API_BASE_URL}/text`;
      apiPayload.length_hint = 'detailed'; // Example specific param
      apiPayload.platform = 'documentation';
    } else {
      apiUrl = `${API_BASE_URL}/script`;
      apiPayload.platform = 'video'; // Example specific param
      if (preset === 'thought-leadership') {
        apiPayload.style_override = { energy: 'calm', formality: 'formal' };
      } else { // product-announcement
         apiPayload.style_override = { energy: 'high', formality: 'casual' };
      }
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const apiData = await response.json();

      // --- Map API response to DemoScenario structure ---
      let mappedScenario: DemoScenario;

      if (preset === 'api-documentation') {
        // Mapping for /text response
        mappedScenario = {
          human: {
            narrative: apiData.post_content || 'Error: Could not load content.',
            emotionalTags: ['informative', 'neutral'], // Mocked
            authenticityScore: apiData.authenticity_score || 0.7,
            engagementMetrics: { predictedComments: '5-10', shares: '10-15' } // Mocked
          },
          agent: {
            jsonLd: { "@context": "https://schema.org", "@type": "WebAPI", "name": "Mock API Docs", "description": apiData.key_messages?.join(' ') || 'API details' }, // Mocked/Derived
            parseabilityScore: 0.99, // Mocked
            entities: apiData.suggested_hashtags || ['API', 'Docs'] // Derived
          }
        };
      } else {
        // Mapping for /script response
        mappedScenario = {
          human: {
            narrative: apiData.script_content || 'Error: Could not load content.',
            emotionalTags: ['engaging', 'clear'], // Mocked
            authenticityScore: apiData.authenticity_score || 0.8,
            engagementMetrics: { predictedComments: '20-30', shares: '40-50' } // Mocked
          },
          agent: {
            jsonLd: { "@context": "https://schema.org", "@type": "VideoObject", "name": `Video Script: ${preset}`, "description": apiData.talking_points?.join('. ') || 'Script details' }, // Mocked/Derived
            parseabilityScore: 0.90, // Mocked
            entities: apiData.talking_points || ['Video', 'Script'] // Derived
          }
        };
      }

      setCurrentScenario(mappedScenario);
      // --- End Mapping ---

      // Set balance based on preset type
       switch (preset) {
        case 'thought-leadership':
          setBalance(0.8);
          break;
        case 'product-announcement':
          setBalance(0.5); // Prompt said 60%, using 50% for simplicity here
          break;
        case 'api-documentation':
          setBalance(0.3);
          break;
        default:
          setBalance(0.7); // Default if somehow unknown
      }
    } catch (err) {
      console.error("Error loading preset:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setCurrentScenario(DEFAULT_DEMO_CONTENT); // Revert to default on error
      setBalance(0.7);
    } finally {
      setIsLoading(false);
    }
  };

  // Load default preset on initial mount (optional)
  // useEffect(() => {
  //   loadPreset('product-announcement'); // Example: load product announcement by default
  // }, []);

  return (
    <>
      <Header />
      <main>
        <Container className="py-8 md:py-12"> {/* Add padding */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Virio Dual-Audience Demo
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
            Adjust the slider to see how content adapts for human vs. agent audiences.
          </p>

          {/* Add Tutorial Pane */}
          <TutorialPane />

          {/* Preset Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => loadPreset('thought-leadership')}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-colors"
            >
              Load: Thought Leadership (80% Human)
            </button>
            <button
              onClick={() => loadPreset('product-announcement')}
              disabled={isLoading}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded disabled:opacity-50 transition-colors"
            >
              Load: Product Announce (50% Human)
            </button>
            <button
              onClick={() => loadPreset('api-documentation')}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-50 transition-colors"
            >
              Load: API Docs (30% Human)
            </button>
          </div>

          {/* Loading and Error States */}
          {isLoading && <p className="text-center text-blue-500">Loading preset...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {/* Slider */}
          <AudienceSlider
            initialBalance={balance * 100} // Pass initial value based on state
            onBalanceChange={handleBalanceChange}
          />

          {/* Output */}
          <ContentOutput
            humanContent={currentScenario.human}
            agentContent={currentScenario.agent}
            balance={balance}
          />

          {/* Placeholder for React Joyride Tour */}
          {/* <DemoTour /> */}

        </Container>
      </main>
      <Footer />
    </>
  );
};

export default DemoPage;
