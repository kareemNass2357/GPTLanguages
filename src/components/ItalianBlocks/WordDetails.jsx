import React from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const WordDetails = () => {
  const { wordDetails, nightMode } = useItalian();

  if (!wordDetails) {
    return <p>Loading word details...</p>; // Render loading message
  }

  return (
    <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
      <h3 className="text-lg font-bold text-center text-red-600">Word Translation</h3>
      <p className="text-center"><strong>Translation:</strong> {wordDetails.translation}</p>
      <p className="text-center"><strong>Example in a Sentence:</strong> {wordDetails.example_in_a_sentence}</p>
      <p className="text-center"><strong>Second Example:</strong> {wordDetails.second_example}</p>
    </div>
  );
};

export default WordDetails;
