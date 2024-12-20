import React from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file
import { formatText as formatTextUtil } from '../../utils/formatText'; // Import the formatText function

const VERB_COLOR = 'green';

const ParagraphTranslate = ({ fontSize, translation, loading, error, highlightedLine, setHighlightedLine }) => {
  const {
    fetchAskingAWord,
    setVerbDetails,
    setVerbDetailsLoading,
    clickedWords,
    setClickedWords,
    nightMode,
  } = useItalian();

  const handleWordClick = async (word, color) => {
    setClickedWords((prev) => ({ ...prev, [word]: true })); // Update clicked words dictionary
    setVerbDetailsLoading(); // Trigger loading state
    try {
      const details = await fetchAskingAWord(word, color === VERB_COLOR, { mode: 'no-cors' });
      console.log('Word details received:', details);
      setVerbDetails(details); // Pass the details to the parent component
    } catch (error) {
      console.error('Error fetching word translation:', error);
    }
  };

  const handleMouseEnter = (lineIndex) => {
    setHighlightedLine(lineIndex);
    console.log('Highlighted line number:', lineIndex);
  };

  const handleMouseLeave = () => {
    setHighlightedLine('');
  };

  return (
    <div className={`w-full md:w-[48%] border border-black p-2 m-2 rounded overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`} style={{ fontSize: `${fontSize}px`, textAlign: 'left' }}>
      <div className="flex mb-2">
        <div className="small-font">Translated Paragraph</div>
      </div>
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <div className="paragraph-container">
            {formatTextUtil(translation, highlightedLine, handleMouseEnter, handleMouseLeave, fontSize)}
          </div>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ParagraphTranslate;
