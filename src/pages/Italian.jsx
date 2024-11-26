import React from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import VerbDetails from '../components/ItalianBlocks/VerbDetails';
import { useItalian } from '../context/ItalianContext';

const Italian = () => {
  const {
    description,
    paragraph,
    verbDetails,
    verbDetailsLoading,
    handleIntroInputDone,
    setParagraph,
  } = useItalian();

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  return (
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
      {verbDetails && <VerbDetails details={verbDetails} />}
    </section>
  );
};

export default Italian;