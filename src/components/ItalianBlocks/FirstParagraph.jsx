import React, { useState, useEffect } from 'react';

const FirstParagraph = ({ description, onNext, fetchParagraph }) => {
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFetchParagraph = async () => {
      setLoading(true);
      try {
        const data = await fetchParagraph(description);
        setParagraph(data.paragraph);
      } catch (error) {
        console.error('Error fetching paragraph:', error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchParagraph();
  }, [description, fetchParagraph]);

  const handleRefresh = () => {
    handleFetchParagraph();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="border border-black p-5 m-2 rounded">
      <div className="mb-2">
        {loading ? 'Loading...' : paragraph}
      </div>
      <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
        Refresh
      </button>
      <button onClick={handleNext} className="px-4 py-2 bg-green-500 text-white rounded">
        Next
      </button>
    </div>
  );
};

export default FirstParagraph;
