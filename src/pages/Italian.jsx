import React, { useState } from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import VerbDetails from '../components/ItalianBlocks/VerbDetails'; // Import the new component

const Italian = ({ description, handleIntroInputDone, fetchParagraph, fetchTranslation, fetchAskingAWord }) => {
  const [paragraph, setParagraph] = useState('');
  const [verbDetails, setVerbDetails] = useState(null); // State for verb details
  const [verbDetailsLoading, setVerbDetailsLoading] = useState(false); // State for loading verb details
  const [clickedWords, setClickedWords] = useState({}); // State for clicked words

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  const handleVerbDetails = (details) => {
    setVerbDetails(details);
    setVerbDetailsLoading(false); // Reset loading state
  };

  const handleVerbDetailsLoading = () => {
    setVerbDetailsLoading(true); // Set loading state
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
          onVerbDetailsLoading={handleVerbDetailsLoading} // Pass the loading handler to ParagraphTranslate
          clickedWords={clickedWords} // Pass the clicked words state
          setClickedWords={setClickedWords} // Pass the setter for clicked words
        />
      )}
      {verbDetailsLoading && <p>Loading verb details...</p>} {/* Show loading message */}
      {verbDetails && <VerbDetails details={verbDetails} />} {/* Render VerbDetails if available */}
    </section>
  );
};

export default Italian;