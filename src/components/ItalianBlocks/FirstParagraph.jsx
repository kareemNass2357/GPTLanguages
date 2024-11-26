import React, { useState, useEffect } from 'react';

const FirstParagraph = ({ description, onNext, fetchParagraph }) => {
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // Added to track if the paragraph is already fetched

  const handleFetchParagraph = async () => {
    console.log("FirstParagraph.jsx: Fetching paragraph with description:", description);
    setLoading(true);
    try {
      const data = await fetchParagraph(description);
      console.log("FirstParagraph.jsx: Fetched paragraph:", data);
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
      setParagraph(data.paragraph);
    } catch (error) {
      console.error('Error refreshing paragraph:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    onNext(paragraph);
  };

  const handleParagraphChange = (event) => {
    setParagraph(event.target.value);
  };

  return (
    <div className="w-3/5 border border-black p-5 m-2 rounded mx-auto">
      <div className="mb-2">
        {loading ? (
          'Loading...'
        ) : (
          <textarea
            value={paragraph}
            onChange={handleParagraphChange}
            className="w-full h-60 p-2 border rounded resize-none"
            readOnly={false}
          />
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Refresh
        </button>
        <button onClick={handleNext} className="px-3 py-2 bg-green-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default FirstParagraph;
