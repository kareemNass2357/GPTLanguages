import React from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import TranslateWord from '../components/ItalianBlocks/TranslateWord'; // Import the new component
import { useItalian } from '../context/ItalianContext';

const Italian = () => {
  const {
    description,
    paragraph,
    verbDetailsLoading,
    handleIntroInputDone,
    nightMode,
    toggleNightMode,
    setParagraph,
    selectedWord,
    isVerb,
  } = useItalian();

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <div className="flex justify-center mt-2">
        <button onClick={toggleNightMode} className="px-4 py-2 bg-gray-800 text-white rounded mb-4">
          Toggle Night Mode
        </button>
      </div>
      <section className='flex flex-col justify-center items-center h-full'>
        <IntroInput onDone={handleIntroInputDone} />
        {description && (
          <>
            <FirstParagraph description={description} onNext={paragraphAssigned} />
          </>
        )}
        {paragraph && (
          <ParagraphTranslate />
        )}
        {verbDetailsLoading && <p>Loading verb details...</p>}
        {selectedWord && <TranslateWord word={selectedWord} isVerb={isVerb} />} {/* Use TranslateWord component */}
      </section>
    </div>
  );
};

export default Italian;