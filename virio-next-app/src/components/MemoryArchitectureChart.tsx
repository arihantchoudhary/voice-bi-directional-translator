'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Rectangle
} from 'recharts';

// Define types for our component
interface MemoryModule {
  name: string;
  features: string[];
  color: string;
}

interface MemoryLayer {
  name: string;
  modules: MemoryModule[];
  color: string;
  backgroundColor: string;
}

interface MemoryArchitectureProps {
  className?: string;
}

// Define custom shape for our bars to show them as boxes with rounded corners
const CustomBar = (props: any) => {
  const { x, y, width, height, color } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      stroke="#333"
      strokeWidth={1}
      radius={[5, 5, 5, 5]}
    />
  );
};

// Component for the Module
const ModuleBox = ({ module, index }: { module: MemoryModule; index: number }) => {
  return (
    <div 
      style={{ 
        backgroundColor: module.color, 
        borderRadius: '5px',
        padding: '15px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flex: '1',
        minWidth: '250px'
      }}
    >
      <h3 style={{ 
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        {module.name}
      </h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {module.features.map((feature, i) => (
          <li key={i} style={{ 
            padding: '4px 0',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <span style={{ marginRight: '8px', color: '#333' }}>•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for the Layer
const LayerSection = ({ layer }: { layer: MemoryLayer }) => {
  return (
    <div style={{ 
      backgroundColor: layer.backgroundColor, 
      border: `2px solid ${layer.color}`,
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '20px'
    }}>
      <h2 style={{ 
        color: layer.color,
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px'
      }}>
        {layer.name}
      </h2>
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'space-between'
      }}>
        {layer.modules.map((module, index) => (
          <ModuleBox key={index} module={module} index={index} />
        ))}
      </div>
    </div>
  );
};

// Stats data for the bar chart
const moduleStats = [
  { name: 'Experience Memory', human: 90, agent: 40, trend: 50 },
  { name: 'Voice Pattern', human: 80, agent: 30, trend: 40 },
  { name: 'Value Framework', human: 85, agent: 35, trend: 45 },
  { name: 'Knowledge Graph', human: 40, agent: 95, trend: 60 },
  { name: 'Structured Data', human: 30, agent: 90, trend: 50 },
  { name: 'Parseable Content', human: 35, agent: 85, trend: 45 },
  { name: 'Viral Content', human: 40, agent: 45, trend: 90 },
  { name: 'Topic Velocity', human: 45, agent: 50, trend: 85 },
  { name: 'Kafka Streams', human: 35, agent: 55, trend: 80 },
];

// Triple-Layer Memory Architecture component
const MemoryArchitectureChart: React.FC<MemoryArchitectureProps> = ({ className }) => {
  // Data for the memory architecture
  const memoryLayers: MemoryLayer[] = [
    {
      name: "Human-Centric Layer",
      color: "#2e7d32",
      backgroundColor: "#e8f5e9",
      modules: [
        {
          name: "Experience Memory Bank",
          color: "#c8e6c9",
          features: [
            "Chronological stories",
            "Emotional tagging (Plutchik)",
            "768-dimension embeddings"
          ]
        },
        {
          name: "Voice Pattern Module",
          color: "#c8e6c9",
          features: [
            "XLNet language model",
            "Stylistic fingerprinting",
            "Humor & rhetoric patterns"
          ]
        },
        {
          name: "Value Framework",
          color: "#c8e6c9",
          features: [
            "Core beliefs & positions",
            "Ethical guardrails",
            "Constitutional AI rules"
          ]
        }
      ]
    },
    {
      name: "Agent-Centric Layer",
      color: "#1565c0",
      backgroundColor: "#e3f2fd",
      modules: [
        {
          name: "Knowledge Graph",
          color: "#bbdefb",
          features: [
            "Neo4j with 58 entity types",
            "Schema.org alignment",
            "3.2M relationship edges/client"
          ]
        },
        {
          name: "Structured Data Store",
          color: "#bbdefb",
          features: [
            "JSON-LD templates",
            "W3C-validated schemas",
            "API endpoint mappings"
          ]
        },
        {
          name: "Parseable Content Library",
          color: "#bbdefb",
          features: [
            "Metadata-rich templates",
            "Crawl-optimized patterns",
            "Task completion hooks"
          ]
        }
      ]
    },
    {
      name: "Trend & Context Overlay",
      color: "#e65100",
      backgroundColor: "#fff3e0",
      modules: [
        {
          name: "Viral Content Feeds",
          color: "#ffe0b2",
          features: [
            "Real-time monitoring",
            "Engagement indicators"
          ]
        },
        {
          name: "Topic Velocity Tracking",
          color: "#ffe0b2",
          features: [
            "Trend acceleration metrics",
            "Predictive modeling"
          ]
        },
        {
          name: "Kafka Real-time Streams",
          color: "#ffe0b2",
          features: [
            "Streaming data pipeline",
            "Real-time aggregation"
          ]
        }
      ]
    }
  ];

  return (
    <div className={className}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>
        Virio Triple-Layer Memory Architecture
      </h2>
      
      {/* Visualize the triple-layer architecture */}
      <div style={{ marginBottom: '40px' }}>
        {memoryLayers.map((layer, index) => (
          <React.Fragment key={index}>
            <LayerSection layer={layer} />
            {index < memoryLayers.length - 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '10px 0' 
              }}>
                <div style={{ 
                  width: '0',
                  height: '30px',
                  borderLeft: '2px solid #333',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '-5px',
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid #333'
                  }}></div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        
        {/* RAG Orchestrator */}
        <div style={{ 
          backgroundColor: "#e1bee7", 
          border: "2px solid #6a1b9a",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "center",
          marginTop: "20px"
        }}>
          <h3 style={{ 
            color: "#6a1b9a",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            Dual-Path RAG Orchestrator
          </h3>
        </div>
      </div>

      {/* Usage Analytics Chart */}
      <h3 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        Memory Layer Utilization by Audience Type
      </h3>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={moduleStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ 
                value: 'Utilization %', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} 
            />
            <Tooltip formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Bar 
              dataKey="human" 
              name="Human Audience" 
              fill="#2e7d32" 
              shape={<CustomBar color="#c8e6c9" />}
            />
            <Bar 
              dataKey="agent" 
              name="Agent Audience" 
              fill="#1565c0" 
              shape={<CustomBar color="#bbdefb" />}
            />
            <Bar 
              dataKey="trend" 
              name="Trend Context" 
              fill="#e65100" 
              shape={<CustomBar color="#ffe0b2" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemoryArchitectureChart;
