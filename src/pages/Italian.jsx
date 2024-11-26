import React, { useState } from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import VerbDetails from '../components/ItalianBlocks/VerbDetails'; // Import the new component

const Italian = ({ description, handleIntroInputDone, fetchParagraph, fetchTranslation, fetchAskingAWord }) => {
  const [paragraph, setParagraph] = useState('');
  const [verbDetails, setVerbDetails] = useState(null); // State for verb details
  const [clickedWords, setClickedWords] = useState({}); // State for clicked words

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  const handleVerbDetails = (details) => {
    setVerbDetails(details);
  };

  return (
    <section className='flex flex-col justify-center items-center h-full'>
      <IntroInput onDone={handleIntroInputDone} />
      {description && (
        <>
          <FirstParagraph description={description} onNext={paragraphAssigned} fetchParagraph={fetchParagraph} />
        </>
      )}
      {paragraph && (
        <ParagraphTranslate
          paragraph={paragraph}
          fetchTranslation={fetchTranslation}
          fetchAskingAWord={fetchAskingAWord}
          onVerbDetails={handleVerbDetails} // Pass the handler to ParagraphTranslate
          clickedWords={clickedWords} // Pass the clicked words state
          setClickedWords={setClickedWords} // Pass the setter for clicked words
        />
      )}
      {verbDetails && <VerbDetails details={verbDetails} />} {/* Render VerbDetails if available */}
    </section>
  );
};

export default Italian;