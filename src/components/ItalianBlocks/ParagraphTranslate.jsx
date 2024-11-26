import React, { useState } from 'react';

const VERB_COLOR = 'green';

const ParagraphTranslate = ({ paragraph, fetchTranslation, fetchAskingAWord }) => {
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [error, setError] = useState(''); // New state variable for error handling

  const handleTranslate = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      console.log('were in paragraphtranslate   in handletranslate ')
      const data = await fetchTranslation(paragraph);
      setTranslation(data.translation);
    } catch (error) {
      console.error('Error fetching translation:', error);
      setError('Error fetching translation'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleWordClick = async (word, color) => {
    if (selectedWord === word) {
      translateWord(word, color);
    } else {
      setSelectedWord(word);
    }
    try {
     
    } catch (error) {
      console.error('Error fetching word translation:', error);
      setError('Error fetching word translation'); // Set error message
    }
  };

  const translateWord = async (word, color) => {
    const isVerb = color === VERB_COLOR;
    const translation = await fetchAskingAWord(word, isVerb);
    console.log(`Translation for ${word}:`, translation);
  };

  const formatText = (text) => {
    return text.split(' ').map((word, index) => {
      const displayWord = word.startsWith('*') ? word.substring(1) : word;
      const color = word.startsWith('*') ? VERB_COLOR : 'black';
      return (
        <span
          key={index}
          style={{ color: color, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => handleWordClick(displayWord, color)}
        >
          {displayWord}{' '}
        </span>
      );
    });
  };

  return (
    <div className="border border-black p-5 m-2 rounded">
      <div className="mb-2">
        {loading ? 'Loading...' : formatText(translation)}
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <button onClick={handleTranslate} className="px-4 py-2 bg-blue-500 text-white rounded">
        Translate
      </button>
    </div>
  );
};

export default ParagraphTranslate;
