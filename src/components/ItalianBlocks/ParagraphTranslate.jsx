import React from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

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

  const formatText = (text) => {
    return text.split('.').map((sentence, index) => (
      <p
        key={index}
        className="paragraph-line text-left"
        onMouseEnter={() => handleMouseEnter(index + 1)}
        onMouseLeave={handleMouseLeave}
      >
        {sentence.split(' ').map((word, wordIndex) => {
          const displayWord = word.startsWith('*') ? word.substring(1) : word;
          const color = word.startsWith('*') ? VERB_COLOR : nightMode ? '#ecf0f1' : 'black';
          return (
            <span
              key={wordIndex}
              style={{ color: color, fontWeight: 'bold', cursor: 'pointer', fontSize: `${fontSize}px` }}
              onClick={() => handleWordClick(displayWord, color)}
            >
              {displayWord}{' '}
            </span>
          );
        })}
      </p>
    ));
  };

  return (
    <div className={`w-full md:w-[70vw] border border-black p-5 m-2 rounded mx-auto overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`} style={{ fontSize: `${fontSize}px`, textAlign: 'left' }}>
      <div className="flex justify-between mb-2">
        <div className="small-font">Translated Paragraph</div>
      </div>
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <div className="paragraph-container">
            {formatText(translation)}
          </div>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ParagraphTranslate;
