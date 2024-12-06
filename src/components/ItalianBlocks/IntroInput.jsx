import React, { useState, useEffect } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const optionsDict = {
  option1: { title: 'Option 1', prompt: 'Prompt 1' },
  option2: { title: 'Option 2', prompt: 'Prompt 2' },
  option3: { title: 'Option 3', prompt: 'Prompt 3' },
  option4: { title: 'Option 4', prompt: 'Prompt 4' },
  option5: { title: 'Option 5', prompt: 'Prompt 5' },
  option6: { title: 'Option 6', prompt: 'Prompt 6' },
  option7: { title: 'Option 7', prompt: 'Prompt 7' },

};

const IntroInput = ({ onDone }) => {
  const [inputValue, setInputValue] = useState('');
  const { nightMode } = useItalian();

  const handleDone = () => {
    if (inputValue.trim()) {
      console.log('Done button was clicked with input:', inputValue);
      onDone(inputValue);
    }
  };

  const handleOptionClick = (prompt) => {
    setInputValue(prompt);
  };

  // Add event listener for Ctrl + Enter key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        handleDone();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue]);

  return (
    <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
      <div className="mb-1 small-font">Please enter a topic. A paragraph will be built about it.</div>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-box p-2 mb-2 border border-gray-400 rounded resize-none w-full"
        rows="4"
      />
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.entries(optionsDict).map(([key, { title, prompt }]) => (
          <button
            key={key}
            onClick={() => handleOptionClick(prompt)}
            className="px-4 py-2 bg-gray-200 text-black rounded-full"
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <button onClick={handleDone} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default IntroInput;
