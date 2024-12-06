import React, { useState, useEffect } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const optionsDict = {
  option1: { title: 'simple conversation', prompt: 'provide a long conversation between two people , the conversation should use the most used words, the language should be simple.', background: '#FF6B6B' },
  option2: { title: 'moderate conversation', prompt: 'provide a long conversation betwen two people, the conversation should be detailed with important words that is used in the language. the conversation sholdnt shy from deep topics.', background: '#4ECDC4' },
  option3: { title: 'simple words', prompt: 'provide 10 words about an everyday subjects, and provide an example sentence for each word. the words should be from the 100 most used words in the language', background: '#FFD93D' },
  option4: { title: 'moderate words', prompt: 'provide 10 words about an everyday subjects, and provide an example sentence for each word. the words should be from the 500 most used words in the language. provide words that are complex but are needed in everyday conversations', background: '#2D3436' },
};

const IntroInput = ({ onDone }) => {
  const [inputValue, setInputValue] = useState('');
  const { nightMode } = useItalian();

  const handleDone = (value) => {
    console.log('handle done is clicked, input value = ' + value);
    if (value.trim()) {
      console.log('Done button was clicked with input:', value);
      setInputValue(value);
      onDone(value);
    }
    console.log('handle done is handled');
  };

  const handleOptionClick = (prompt) => {
    setInputValue(prompt);
    console.log('printing input value immediately after ' + prompt);
    setTimeout(() => handleDone(prompt), 100); // Ensure handleDone is called after inputValue is set
    console.log('were after handledone was clicked fom option button');
  };

  // Add event listener for Ctrl + Enter key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        handleDone(inputValue);
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
      <div className="flex justify-between mb-2">
        <div className="flex flex-wrap gap-2">
          {Object.entries(optionsDict).map(([key, { title, prompt, background }]) => (
            <button
              key={key}
              onClick={() => handleOptionClick(prompt)}
              className="px-4 py-2 text-black rounded-full"
              style={{ backgroundColor: background }}
            >
              {title}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={() => handleDone(inputValue)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroInput;
