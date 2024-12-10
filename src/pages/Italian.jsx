import React, { useState } from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import VerbDetails from '../components/ItalianBlocks/VerbDetails';
import ToggleNightMode from '../components/ToggleNightMode';
import { useItalian } from '../context/ItalianContext';

const Italian = () => {
  const {
    description,
    paragraph,
    verbDetails,
    verbDetailsLoading,
    handleIntroInputDone,
    fetchTranslation,
    nightMode,
    toggleNightMode, 
    setParagraph,
  } = useItalian();

  const [fontSize, setFontSize] = useState(16);
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    console.log('---were in handle trnslate')
    try {
      const data = await fetchTranslation(paragraph, { mode: 'no-cors' });
      setTranslation(data.translation);
    } catch (error) {
      setError('Error fetching translation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <section className='flex flex-col justify-center items-center h-full'>
        <div className="w-full md:w-[70vw] flex justify-center">
          <ToggleNightMode nightMode={nightMode} toggleNightMode={toggleNightMode} />
        </div>
        <IntroInput onDone={handleIntroInputDone} />
        {description && (
          <>
            <FirstParagraph 
              description={description} 
              onNext={paragraphAssigned} 
              fontSize={fontSize} 
              onFontSizeChange={handleFontSizeChange} 
              onTranslate={handleTranslate}
              loading={loading}
              error={error}
            />
          </>
        )}
        {paragraph && <ParagraphTranslate fontSize={fontSize} translation={translation} />}
        {/* {verbDetailsLoading && <p>Loading verb details...</p>} */}
        {/* {verbDetails && <VerbDetails details={verbDetails} />} */}
      </section>
    </div>
  );
};

export default Italian;