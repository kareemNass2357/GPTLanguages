import React, { useState } from 'react';

const VERB_COLOR = 'green';

const ParagraphTranslate = ({ paragraph, fetchTranslation, fetchAskingAWord, onVerbDetails, onVerbDetailsLoading, clickedWords, setClickedWords }) => {
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('were in paragraphtranslate   in handletranslate ')
      const data = await fetchTranslation(paragraph, { mode: 'no-cors' });
      console.log('Translation data received:', data);
      setTranslation(data.translation);
    } catch (error) {
      console.error('Error fetching translation:', error);
      setError('Error fetching translation');
    } finally {
      setLoading(false);
    }
  };

  const handleWordClick = async (word, color) => {
    setSelectedWord(word);
    setClickedWords((prev) => ({ ...prev, [word]: true })); // Update clicked words dictionary
    onVerbDetailsLoading(); // Trigger loading state
    try {
      const details = await fetchAskingAWord(word, color === VERB_COLOR, { mode: 'no-cors' });
      console.log('Word details received:', details);
      onVerbDetails(details); // Pass the details to the parent component
    } catch (error) {
      console.error('Error fetching word translation:', error);
      setError('Error fetching word translation');
    }
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
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={handleTranslate} className="px-4 py-2 bg-blue-500 text-white rounded">
        Translate
      </button>
    </div>
  );
};

export default ParagraphTranslate;
