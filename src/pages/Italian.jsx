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
import LoadIcon from '@mui/icons-material/CloudDownload'; // Import the Load icon from Material-UI
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
  const [savedParagraphs, setSavedParagraphs] = useState([]);
  const [loadingSavedParagraphs, setLoadingSavedParagraphs] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [initialParagraph, setInitialParagraph] = useState('');

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

  const handleLoad = async () => {
    setLoadingSavedParagraphs(true);
    try {
      const response = await axios.get('http://localhost:8000/savedData');
      setSavedParagraphs(response.data);
    } catch (error) {
      console.error('Error loading saved paragraphs:', error);
      alert('Error loading saved paragraphs. Please try again.');
    } finally {
      setLoadingSavedParagraphs(false);
    }
  };

  const handleParagraphClick = (paragraph) => {
    setParagraph(paragraph.paragraph);
    setTranslation(paragraph.translation);
    setShowTranslation(true);
    setShowIntro(false); // Hide the IntroInput component
    setShouldFetch(false); // Prevent fetching from OpenAI
    setInitialParagraph(paragraph.paragraph); // Set the initial paragraph
    setStackedLayout(false); // Ensure the layout toggle button is shown
    setSavedParagraphs([]); // Hide the list of saved paragraphs
  };

  return (
    <div className={nightMode ? 'night-mode' : ''}>
      <section className='flex flex-col justify-center items-center h-full'>
        <div className="w-full md:w-[70vw] flex justify-between items-center">
          <ToggleNightMode nightMode={nightMode} toggleNightMode={toggleNightMode} />
          <div className="flex items-center gap-4">
            {showTranslation && (
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex items-center">
                <SaveIcon className="mr-2" /> Save
              </button>
            )}
            <button onClick={handleLoad} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <LoadIcon className="mr-2" /> Load
            </button>
          </div>
        </div>
        {loadingSavedParagraphs && <p>Loading saved paragraphs...</p>}
        {savedParagraphs.length > 0 && (
          <div className="w-full md:w-[70vw] mt-4">
            <h3 className="text-lg font-bold mb-2">Saved Paragraphs</h3>
            <ul className="list-disc pl-5">
              {savedParagraphs.map((item, index) => (
                <li key={index} className="cursor-pointer hover:underline" onClick={() => handleParagraphClick(item)}>
                  {item.paragraph.substring(0, 20)}...
                </li>
              ))}
            </ul>
          </div>
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
                shouldFetch={shouldFetch}
                initialParagraph={initialParagraph}
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
        {!description && paragraph && (
          <>
            {showTranslation && (
              <button onClick={toggleLayout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 flex items-center">
                {stackedLayout ? <ViewColumnIcon className="mr-2" /> : <ViewStreamIcon className="mr-2" />} Toggle Layout
              </button>
            )}
            <div className={`flex w-full md:w-[70vw] ${stackedLayout ? 'flex-col' : 'justify-between'}`}>
              <FirstParagraph 
                description={paragraph} 
                onNext={paragraphAssigned} 
                fontSize={fontSize} 
                onFontSizeChange={handleFontSizeChange} 
                onTranslate={handleTranslate}
                translation={translation}
                highlightedLine={highlightedLine}
                setHighlightedLine={setHighlightedLine}
                showTranslation={showTranslation}
                shouldFetch={shouldFetch}
                initialParagraph={initialParagraph}
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