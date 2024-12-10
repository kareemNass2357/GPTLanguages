import React, { useState, useEffect } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const SizeButton = ({ onClick, label }) => (
  <button onClick={onClick} className="size-btn px-1 py-1 bg-gray-300 rounded w-6 h-6 flex items-center justify-center text-sm">
    {label}
  </button>
);

const FirstParagraph = ({ description, onNext, fontSize, onFontSizeChange }) => {
  const {
    setParagraph,
    fetchParagraph,
    nightMode,
  } = useItalian();

  const [paragraph, setLocalParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // Added to track if the paragraph is already fetched

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
    if (description.trim() && !isFetched) {
      handleFetchParagraph(); // Fetch only if not already fetched
    }
  }, [description, isFetched]); // Depend on `isFetched` to avoid repeated calls

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

  const increaseFontSize = () => {
    onFontSizeChange(fontSize + 1);
  };

  const decreaseFontSize = () => {
    onFontSizeChange(fontSize - 1);
  };

  return (
    <div className={`w-full md:w-[70vw] border border-black p-5 m-2 rounded mx-auto overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      <div className="flex justify-between mb-2">
        <div className="small-font">First Paragraph</div>
        <div className="flex gap-2">
          <SizeButton onClick={decreaseFontSize} label="-" />
          <SizeButton onClick={increaseFontSize} label="+" />
        </div>
      </div>
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <div className="paragraph-container">
            {paragraph.split('\n').map((line, index) => (
              <p key={index} className="paragraph-line text-left">{line}</p>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Refresh
        </button>
        <button onClick={() => onNext('Next paragraph')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default FirstParagraph;
