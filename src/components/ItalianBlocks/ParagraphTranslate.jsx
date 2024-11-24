import React, { useState } from 'react';

const ParagraphTranslate = ({ paragraph, fetchTranslation }) => {
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const data = await fetchTranslation(paragraph);
      setTranslation(data.translation);
    } catch (error) {
      console.error('Error fetching translation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-black p-5 m-2 rounded">
      <div className="mb-2">
        {loading ? 'Loading...' : translation}
      </div>
      <button onClick={handleTranslate} className="px-4 py-2 bg-blue-500 text-white rounded">
        Translate
      </button>
    </div>
  );
};

export default ParagraphTranslate;
