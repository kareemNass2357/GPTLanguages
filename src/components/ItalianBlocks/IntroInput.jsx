import React, { useState } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const IntroInput = ({ onDone }) => {
  const [inputValue, setInputValue] = useState('');
  const { nightMode } = useItalian();

  const handleDone = () => {
    if (inputValue.trim()) {
      console.log('Done button was clicked with input:', inputValue);
      onDone(inputValue);
    }
  };

  return (
    <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
      <p className="mb-2">Please enter a topic. A paragraph will be built about it.</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-box p-2 mb-2 border border-gray-400 rounded" // Use input-box class here
      />
      <div className="flex justify-center mt-2">
        <button onClick={handleDone} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default IntroInput;
