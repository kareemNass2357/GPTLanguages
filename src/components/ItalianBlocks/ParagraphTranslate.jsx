import React, { useState } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file
import VerbDetails from './VerbDetails';
import WordDetails from './WordDetails';

const VERB_COLOR = 'green';

const ParagraphTranslate = () => {
  const {
    paragraph,
    fetchTranslation,
    fetchAskingAWord,
    setVerbDetails,
    setVerbDetailsLoading,
    setWordDetails,
    clickedWords,
    setClickedWords,
    nightMode,
    verbDetails,
    wordDetails,
  } = useItalian();

  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [error, setError] = useState('');
  const [wordLoading, setWordLoading] = useState(false);

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
    const isVerb = color === VERB_COLOR;
    if (isVerb) {
      setVerbDetailsLoading(true);
      setWordDetails(null); // Clear word details when a verb is clicked
      const verbDetails = await fetchAskingAWord(word, true);
      setVerbDetails(verbDetails);
      setVerbDetailsLoading(false);
    } else {
      setWordLoading(true);
      setVerbDetails(null); // Clear verb details when a word is clicked
      const wordDetails = await fetchAskingAWord(word, false);
      setWordDetails(wordDetails);
      setWordLoading(false);
    }
  };

  const formatText = (text) => {
    return text.split(' ').map((word, index) => {
      const displayWord = word.startsWith('*') ? word.substring(1) : word;
      const color = word.startsWith('*') ? VERB_COLOR : nightMode ? '#ecf0f1' : 'black';
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
    <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
      <div className="text-lg font-bold mb-2">press on word to get translation</div>
      <div className="mb-2">
        {loading ? 'Loading...' : formatText(translation)}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-center mt-2">
        <button onClick={handleTranslate} className="px-4 py-2 bg-blue-500 text-white rounded">
          Translate
        </button>
      </div>
      {/* Render VerbDetails or WordDetails based on the state */}
      {wordLoading ? <p>Loading word details...</p> : verbDetails ? <VerbDetails details={verbDetails} /> : wordDetails ? <WordDetails /> : null}
    </div>
  );
};

export default ParagraphTranslate;
