"use client"; // Required for useState and event handlers

import React, { useState } from 'react';

interface SliderProps {
  initialBalance?: number; // Make initial balance optional, default to 70
  onBalanceChange: (humanWeight: number) => void;
}

const AudienceSlider: React.FC<SliderProps> = ({ initialBalance = 70, onBalanceChange }) => {
  const [balance, setBalance] = useState(initialBalance);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setBalance(value);
    onBalanceChange(value / 100); // Pass the weight (0 to 1)
  };

  // Generate the gradient style dynamically based on the balance
  const gradientStyle = {
    background: `linear-gradient(to right, rgb(251 146 60 / ${balance / 100}), rgb(59 130 246 / ${1 - balance / 100}))`,
  };


  return (
    // Using Tailwind classes for styling as per the prompt's example structure
    <div className="bg-gradient-to-r from-orange-400 to-blue-500 p-4 rounded-lg shadow-md mb-6" style={gradientStyle}>
      <label htmlFor="balanceSlider" className="block text-white mb-2 font-medium text-center">
        Audience Balance: {balance}% Human / {100 - balance}% Agent
      </label>
      <input
        id="balanceSlider"
        type="range"
        min="0"
        max="100"
        value={balance}
        onChange={handleSliderChange}
        // Basic Tailwind styling for the range input track and thumb
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-white"
      />
    </div>
  );
};

export default AudienceSlider;
