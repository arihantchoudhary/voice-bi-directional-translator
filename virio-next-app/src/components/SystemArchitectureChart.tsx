'use client';

import React from 'react';
import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
  Rectangle
} from 'recharts';

interface SystemArchitectureProps {
  className?: string;
}

// Custom node renderer for the Sankey diagram
const CustomNode = (props: any) => {
  const { x, y, width, height, index, payload } = props;
  const colors: { [key: string]: string } = {
    'Data Ingestion': '#e3f2fd',
    'Client Data': '#bbdefb',
    'Interview Transcripts': '#bbdefb',
    'Trend Data': '#bbdefb',
    'External Sources': '#bbdefb',
    'Processing & Feature Extraction': '#e8f5e9',
    'NLP Pipeline': '#c8e6c9',
    'Client Modeling': '#c8e6c9',
    'Trend Analysis': '#c8e6c9',
    'Feature Store': '#c8e6c9',
    'Triple-Layer Memory Interface': '#fff3e0',
    'Dual-Path Generation Services': '#f3e5f5',
    'Human-Optimized Generator': '#e1bee7',
    'Agent-Optimized Generator': '#e1bee7',
    'Dual API Layer': '#e0f7fa',
  };
  
  const borderColors: { [key: string]: string } = {
    'Data Ingestion': '#1565c0',
    'Client Data': '#1565c0',
    'Interview Transcripts': '#1565c0',
    'Trend Data': '#1565c0',
    'External Sources': '#1565c0',
    'Processing & Feature Extraction': '#2e7d32',
    'NLP Pipeline': '#2e7d32',
    'Client Modeling': '#2e7d32',
    'Trend Analysis': '#2e7d32',
    'Feature Store': '#2e7d32',
    'Triple-Layer Memory Interface': '#e65100',
    'Dual-Path Generation Services': '#6a1b9a',
    'Human-Optimized Generator': '#6a1b9a',
    'Agent-Optimized Generator': '#6a1b9a',
    'Dual API Layer': '#006064',
  };

  const color = colors[payload.name] || '#f5f5f5';
  const borderColor = borderColors[payload.name] || '#333';
  const isMainSection = !payload.name.includes('Generator') && 
                        !payload.name.includes('Data') &&
                        !payload.name.includes('Transcripts') &&
                        !payload.name.includes('Sources') &&
                        !payload.name.includes('Pipeline') &&
                        !payload.name.includes('Modeling') &&
                        !payload.name.includes('Analysis') &&
                        !payload.name.includes('Store');

  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.9}
        stroke={borderColor}
        strokeWidth={isMainSection ? 2 : 1}
        radius={[5, 5, 5, 5]}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={isMainSection ? 14 : 12}
        fontFamily="Arial"
        fontWeight={isMainSection ? "bold" : "normal"}
        fill={borderColor}
      >
        {payload.name}
      </text>
    </g>
  );
};

// Component for visualizing individual sections of the architecture
const ArchitectureSection = ({
  title,
  color,
  backgroundColor,
  items = [],
}: {
  title: string;
  color: string;
  backgroundColor: string;
  items?: string[];
}) => {
  return (
    <div
      style={{
        backgroundColor,
        border: `2px solid ${color}`,
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
      }}
    >
      <h2
        style={{
          color,
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '15px',
        }}
      >
        {title}
      </h2>
      {items.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'space-between',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color === '#1565c0' ? '#bbdefb' : 
                               color === '#2e7d32' ? '#c8e6c9' : 
                               color === '#e65100' ? '#ffe0b2' : 
                               color === '#6a1b9a' ? '#e1bee7' : '#b2ebf2',
                borderRadius: '5px',
                padding: '15px',
                margin: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                flex: '1',
                minWidth: items.length > 2 ? '200px' : '250px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color,
                }}
              >
                {item}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Flow Arrow Component
const FlowArrow = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          width: '0',
          height: '30px',
          borderLeft: '2px solid #333',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '-5px',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '8px solid #333',
          }}
        ></div>
      </div>
    </div>
  );
};

// Sankey diagram data
const data = {
  nodes: [
    { name: 'Data Ingestion' },
    { name: 'Client Data' },
    { name: 'Interview Transcripts' },
    { name: 'Trend Data' },
    { name: 'External Sources' },
    { name: 'Processing & Feature Extraction' },
    { name: 'NLP Pipeline' },
    { name: 'Client Modeling' },
    { name: 'Trend Analysis' },
    { name: 'Feature Store' },
    { name: 'Triple-Layer Memory Interface' },
    { name: 'Dual-Path Generation Services' },
    { name: 'Human-Optimized Generator' },
    { name: 'Agent-Optimized Generator' },
    { name: 'Dual API Layer' },
  ],
  links: [
    { source: 0, target: 5, value: 10 },
    { source: 1, target: 0, value: 5 },
    { source: 2, target: 0, value: 5 },
    { source: 3, target: 0, value: 5 },
    { source: 4, target: 0, value: 5 },
    { source: 5, target: 10, value: 10 },
    { source: 6, target: 5, value: 5 },
    { source: 7, target: 5, value: 5 },
    { source: 8, target: 5, value: 5 },
    { source: 9, target: 5, value: 5 },
    { source: 10, target: 11, value: 10 },
    { source: 11, target: 14, value: 10 },
    { source: 12, target: 11, value: 5 },
    { source: 13, target: 11, value: 5 },
  ],
};

// System Architecture Chart Component
const SystemArchitectureChart: React.FC<SystemArchitectureProps> = ({ className }) => {
  return (
    <div className={className}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>
        Virio Dual-Audience System Flow
      </h2>

      {/* Traditional flow diagram */}
      <div style={{ marginBottom: '40px' }}>
        <ArchitectureSection
          title="Data Ingestion"
          color="#1565c0"
          backgroundColor="#e3f2fd"
          items={[
            'Client Data',
            'Interview Transcripts',
            'Trend Data',
            'External Sources',
          ]}
        />
        <FlowArrow />
        <ArchitectureSection
          title="Processing & Feature Extraction"
          color="#2e7d32"
          backgroundColor="#e8f5e9"
          items={[
            'NLP Pipeline',
            'Client Modeling',
            'Trend Analysis',
            'Feature Store',
          ]}
        />
        <FlowArrow />
        <ArchitectureSection
          title="Triple-Layer Memory Interface"
          color="#e65100"
          backgroundColor="#fff3e0"
        />
        <FlowArrow />
        <ArchitectureSection
          title="Dual-Path Generation Services"
          color="#6a1b9a"
          backgroundColor="#f3e5f5"
          items={['Human-Optimized Generator', 'Agent-Optimized Generator']}
        />
        <FlowArrow />
        <ArchitectureSection
          title="Dual API Layer"
          color="#006064"
          backgroundColor="#e0f7fa"
        />
      </div>

      {/* Sankey Diagram for data flow visualization */}
      <h3 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        System Data Flow Analysis
      </h3>
      <div style={{ width: '100%', height: 600 }}>
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={data}
            node={<CustomNode />}
            nodePadding={50}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            link={{ stroke: '#d1d1d1' }}
          >
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>
      </div>

      {/* System flow explanation */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Flow Description:</h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>Data Ingestion Layer:</strong> Collects client data, processes interviews, detects trends, integrates external sources.</li>
          <li><strong>Processing & Feature Extraction:</strong> NLP pipeline (entity/sentiment/style), client modeling (voice/values/experience), trend analysis, feature store management.</li>
          <li><strong>Triple-Layer Memory Interface:</strong> Provides access to Human, Agent, and Trend layers.</li>
          <li><strong>Dual-Path Generation Services:</strong> Human-optimized generator (narrative/emotion) and Agent-optimized generator (structure/schema), blended by a Content Fusion Engine.</li>
          <li><strong>Dual API Layer:</strong> Exposes endpoints for narrative and structured content.</li>
        </ol>
      </div>
    </div>
  );
};

export default SystemArchitectureChart;
