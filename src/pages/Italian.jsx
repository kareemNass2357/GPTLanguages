import React from 'react';
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
    nightMode,
    toggleNightMode, 
    setParagraph,
  } = useItalian();

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
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
            <FirstParagraph description={description} onNext={paragraphAssigned} />
          </>
        )}
        {/* 
        {paragraph && (
          <ParagraphTranslate />
        )}
        {verbDetailsLoading && <p>Loading verb details...</p>}
        {verbDetails && <VerbDetails details={verbDetails} />} */}
      </section>
    </div>
  );
};

export default Italian;