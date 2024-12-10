import React, { useState, useEffect } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon from Material-UI
import RemoveIcon from '@mui/icons-material/Remove'; // Import the Remove icon from Material-UI
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the ArrowForward icon from Material-UI

const optionsDict = {
  // Conversation options
  option1: { 
    title: 'simple conversation', 
    prompt: 'provide a long conversation between two people. The conversation should use the most common words, and the language should be simple and easy to follow.', 
    background: '#FF5733' 
  },
  option2: { 
    title: 'moderate conversation', 
    prompt: 'provide a long conversation between two people. The conversation should include more detailed and meaningful topics, using words important for everyday communication.', 
    background: '#FF5733' 
  },
  
  // Word options
  option3: { 
    title: 'simple words', 
    prompt: 'provide 10 words about an everyday subject, and provide an example sentence for each word. The words should be from the 100 most used words in the language.', 
    background: '#FFC300' 
  },
  option4: { 
    title: 'moderate words', 
    prompt: 'provide 10 words about an everyday subject, and provide an example sentence for each word. The words should be from the 500 most used words in the language and should include more complex but commonly needed words.', 
    background: '#FFC300' 
  },
  
  // Grammar options
  option5: { 
    title: 'simple grammar', 
    prompt: 'provide a mini grammar lesson on a basic grammar topic. Include a clear explanation with simple examples. The lesson should be concise and beginner-friendly.', 
    background: '#33B5E5' 
  },
  option6: { 
    title: 'moderate grammar', 
    prompt: 'provide a mini grammar lesson on an intermediate grammar topic. Include a detailed explanation with multiple examples. The lesson should focus on understanding and real-life application.', 
    background: '#33B5E5' 
  }
};


const IntroInput = ({ onDone }) => {
  const [inputValue, setInputValue] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState(16); // State to manage font size
  const { nightMode } = useItalian();

  const handleDone = (value) => {
    console.log('handle done is clicked, input value = ' + value);
    if (value.trim()) {
      console.log('Done button was clicked with input:', value);
      setInputValue(value);
      onDone(value);
      setCollapsed(true); // Collapse the component
    }
    console.log('handle done is handled');
  };

  const handleOptionClick = (prompt) => {
    setInputValue(prompt);
    console.log('printing input value immediately after ' + prompt);
    setTimeout(() => handleDone(prompt), 100); // Ensure handleDone is called after inputValue is set
    console.log('were after handledone was clicked fom option button');
  };

  const handleMouseClick = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    button.style.setProperty('--rotate-x', `${rotateX}deg`);
    button.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleFontSizeChange = (change) => {
    setFontSize((prevSize) => Math.max(10, prevSize + change)); // Ensure font size doesn't go below 10
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
    <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      {collapsed ? (
        <h2 className="text-center">Intro</h2>
      ) : (
        <>
          <div className="flex justify-between mb-1">
            <div className="small-font">Please enter a topic. A paragraph will be built about it.</div>
            <div className="flex gap-2">
              <button onClick={() => handleFontSizeChange(-2)} className="px-2 py-1 bg-gray-300 rounded"><RemoveIcon /></button>
              <button onClick={() => handleFontSizeChange(2)} className="px-2 py-1 bg-gray-300 rounded"><AddIcon /></button>
            </div>
          </div>
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
                  className="button-82-pushable"
                  style={{ '--button-bg': background }}
                >
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge" style={{ background: background }}></span>
                  <span className="button-82-front text" style={{ background: background }}>{title}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => handleDone(inputValue)} onMouseDown={handleMouseClick} className="next-btn px-4 py-2 bg-blue-500 text-white rounded flex items-center">
                Next <ArrowForwardIcon className="ml-2" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IntroInput;
