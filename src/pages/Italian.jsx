import React, { useState } from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';

const Italian = ({ description, handleIntroInputDone, fetchParagraph, fetchTranslation }) => {
  const [paragraph, setParagraph] = useState('');

  const handleNext = (paragraph) => {
    setParagraph(paragraph);
  };

  return (
    <section className='flex flex-col justify-center items-center h-full'>
      <IntroInput onDone={handleIntroInputDone} />
      {description && (
        <>
          {/* <FirstParagraph description={description} onNext={handleNext} fetchParagraph={fetchParagraph} /> */}
          
          </>
          
          // {paragraph && <ParagraphTranslate paragraph={paragraph} fetchTranslation={fetchTranslation} />}
      )}
    </section>
  );
};

export default Italian;
