import React, { useState } from 'react';

const IntroInput = ({ onDone }) => {
  const [inputValue, setInputValue] = useState('');

  const handleDone = () => {
    onDone(inputValue);
  };

  return (
    <div className="border border-black p-5 m-2 rounded">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 mb-2"
      />
      <button onClick={handleDone} className="px-4 py-2 bg-blue-500 text-white rounded">
        Done
      </button>
    </div>
  );
};

export default IntroInput;
