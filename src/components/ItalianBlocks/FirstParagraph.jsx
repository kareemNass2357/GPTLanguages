import React, { useState, useEffect } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file
import RefreshIcon from '@mui/icons-material/Refresh'; // Import the Refresh icon from Material-UI
import TranslateIcon from '@mui/icons-material/Translate'; // Import the Translate icon from Material-UI
import { formatText } from '../../utils/formatText'; // Import the shared formatText function

const FirstParagraph = ({ description, onNext, fontSize, onTranslate, translation, highlightedLine, setHighlightedLine, showTranslation, shouldFetch, initialParagraph }) => {
  const {
    setParagraph,
    fetchParagraph,
    nightMode,
  } = useItalian();

  const [paragraph, setLocalParagraph] = useState(initialParagraph || '');
  const [isFetched, setIsFetched] = useState(false); // Added to track if the paragraph is already fetched
  const [loading, setLoading] = useState(false);

  const handleFetchParagraph = async () => {
    console.log("FirstParagraph.jsx: Fetching paragraph with description:", description);
    setLoading(true);
    try {
      const data = await fetchParagraph(description);
      console.log("FirstParagraph.jsx: Fetched paragraph:", data);
      setLocalParagraph(data.paragraph);
      setParagraph(data.paragraph);
      setIsFetched(true); // Mark as fetched
    } catch (error) {
      console.error('Error fetching paragraph:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (description.trim() && !isFetched && shouldFetch) {
      handleFetchParagraph(); // Fetch only if not already fetched and shouldFetch is true
    }
  }, [description, isFetched, shouldFetch]); // Depend on `isFetched` and `shouldFetch` to avoid repeated calls

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchParagraph(description);
      setLocalParagraph(data.paragraph);
      setParagraph(data.paragraph);
    } catch (error) {
      console.error('Error refreshing paragraph:', error);
    } finally {
      setLoading(false);
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
    <div className={`w-full md:w-[48%] border border-black p-5 m-2 rounded mx-auto overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      <div className="flex mb-2">
        <div className="small-font">First Paragraph</div>
      </div>
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <div className="paragraph-container">
            {formatText(paragraph, highlightedLine, handleMouseEnter, handleMouseLeave, fontSize)}
          </div>
        )}
      </div>
      {!showTranslation && (
        <div className="flex mt-2 gap-4">
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
            <RefreshIcon className="mr-2" /> Refresh
          </button>
          <button onClick={onTranslate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
            <TranslateIcon className="mr-2" /> Translate
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstParagraph;
