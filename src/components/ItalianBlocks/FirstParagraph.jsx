import React, { useState, useEffect, useRef } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const FirstParagraph = () => {
  const {
    description,
    setParagraph,
    fetchParagraph,
    nightMode,
  } = useItalian();

  const [paragraph, setLocalParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // Added to track if the paragraph is already fetched
  const textareaRef = useRef(null);

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [paragraph]);

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

  const handleParagraphChange = (event) => {
    setLocalParagraph(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={`w-full md:w-[70vw] border border-black p-5 m-2 rounded mx-auto overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <textarea
            ref={textareaRef}
            value={paragraph}
            onChange={handleParagraphChange}
            className="w-full p-2 border rounded resize-none"
            readOnly={false}
            style={{ overflow: 'hidden' }}
          />
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default FirstParagraph;
