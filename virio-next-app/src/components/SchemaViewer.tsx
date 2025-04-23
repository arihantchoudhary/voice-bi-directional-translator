"use client"; // Mark as client component if Monaco Editor is used later

import React from 'react';
// import Editor from '@monaco-editor/react'; // Import when implementing Monaco

interface SchemaViewerProps {
  data: Record<string, any>; // JSON-LD data
}

// Basic placeholder - Monaco Editor integration needed for interactive view
const SchemaViewer: React.FC<SchemaViewerProps> = ({ data }) => {
  const jsonString = JSON.stringify(data, null, 2); // Pretty print JSON

  return (
    <div className="mb-4">
      <h4 className="text-lg font-mono font-semibold mb-2 text-gray-800 dark:text-gray-200">JSON-LD Schema:</h4>
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
        <code>{jsonString}</code>
      </pre>
      {/* Placeholder for Monaco Editor */}
      {/* <Editor
        height="200px"
        language="json"
        value={jsonString}
        options={{ readOnly: true, minimap: { enabled: false } }}
        theme="vs-dark" // Or light theme based on context
      /> */}
    </div>
  );
};

export default SchemaViewer;
