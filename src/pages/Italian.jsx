import React, { useState } from 'react';
import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';
import ParagraphTranslate from '../components/ItalianBlocks/ParagraphTranslate';
import VerbDetails from '../components/ItalianBlocks/VerbDetails';
import ToggleNightMode from '../components/ToggleNightMode';
import { useItalian } from '../context/ItalianContext';
import ViewColumnIcon from '@mui/icons-material/ViewColumn'; // Import the ViewColumn icon from Material-UI
import ViewStreamIcon from '@mui/icons-material/ViewStream'; // Import the ViewStream icon from Material-UI
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon from Material-UI
import axios from 'axios'; // Import axios for HTTP requests


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
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const [highlightedLine, setHighlightedLine] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [stackedLayout, setStackedLayout] = useState(false);

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const paragraphAssigned = (paragraph) => {
    setParagraph(paragraph);
  };

  const handleTranslate = async () => {
    setLoadingTranslation(true);
    setTranslationError('');
    setShowTranslation(true); // Show the translation component immediately
    console.log('---were in handle trnslate')
    try {
      const data = await fetchTranslation(paragraph, { mode: 'no-cors' });
      setTranslation(data.translation);
    } catch (error) {
      setTranslationError('Error fetching translation');
    } finally {
      setLoadingTranslation(false);
    }
  };

  const handleIntroInputDoneWrapper = (data) => {
    handleIntroInputDone(data);
    setShowIntro(false); // Hide the IntroInput component
  };

  const toggleLayout = () => {
    setStackedLayout(!stackedLayout);
  };

  const handleSave = async () => {
    const dataToSave = {
      paragraph,
      translation,
    };
    try {
      await axios.post('http://localhost:8000/savedData', dataToSave);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <section className='flex flex-col justify-center items-center h-full'>
        <div className="w-full md:w-[70vw] flex justify-center">
          <ToggleNightMode nightMode={nightMode} toggleNightMode={toggleNightMode} />
        </div>
        {showTranslation && (
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mb-4 flex items-center">
            <SaveIcon className="mr-2" /> Save
          </button>
        )}
        {showIntro && <IntroInput onDone={handleIntroInputDoneWrapper} />}
        {description && (
          <>
            {showTranslation && (
              <button onClick={toggleLayout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 flex items-center">
                {stackedLayout ? <ViewColumnIcon className="mr-2" /> : <ViewStreamIcon className="mr-2" />} Toggle Layout
              </button>
            )}
            <div className={`flex w-full md:w-[70vw] ${stackedLayout ? 'flex-col' : 'justify-between'}`}>
              <FirstParagraph 
                description={description} 
                onNext={paragraphAssigned} 
                fontSize={fontSize} 
                onFontSizeChange={handleFontSizeChange} 
                onTranslate={handleTranslate}
                translation={translation}
                highlightedLine={highlightedLine}
                setHighlightedLine={setHighlightedLine}
                showTranslation={showTranslation}
              />
              {paragraph && showTranslation && (
                <ParagraphTranslate 
                  fontSize={fontSize} 
                  translation={translation} 
                  loading={loadingTranslation} 
                  error={translationError} 
                  highlightedLine={highlightedLine}
                  setHighlightedLine={setHighlightedLine}
                />
              )}
            </div>
          </>
        )}
        {/* {verbDetailsLoading && <p>Loading verb details...</p>} */}
        {/* {verbDetails && <VerbDetails details={verbDetails} />} */}
      </section>
    </div>
  );
};

export default Italian;