import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Italian from './pages/Italian';
import OpenAI from 'openai';
import { useCallback } from 'react';
import { useState } from 'react';
//region OpenAI
const model = 'gpt-4o-mini'

let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openaiConfig = {apiKey, dangerouslyAllowBrowser: true };
const openai = new OpenAI(openaiConfig);
//endregion

const App = () => {
  const [description, setDescription] = useState('');

  const handleIntroInputDone = async (data) => {
    console.log('Intro Input Data:', data);
    setDescription(data);
    // Call fetchParagraph directly here
    const paragraphData = await fetchParagraph(data);
    console.log('Fetched Paragraph:', paragraphData);
  };

  const handleNext = () => {
    console.log('Next button clicked');
  };

    
  const [loading, setLoading] = useState(false);

  const fetchParagraph = async (description) => {
    if (loading) return; // Prevent overlapping calls
    setLoading(true);
    try {
      console.log('Sending request to OpenAI with description:', description);
      // const completion = await openai.chat.completions.create({
      //   model: model,
      //   messages: [
      //     { role: 'system', content: 'you are a long paragraph writer...' },
      //     { role: 'user', content: `The paragraph should be about: ${description}` },
      //   ],
      // });

      // return { paragraph: completion.choices[0].message.content };
      return { paragraph: 'This is a test paragraph' };
    } catch (error) {
      console.error('Error fetching paragraph from OpenAI:', error);
      return { paragraph: 'Error fetching paragraph. Please try again.' };
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  const fetchTranslation = async (paragraph) => {
    try {
      console.log('Sending request to OpenAI for translation of paragraph:', paragraph);
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: 'You are a translator. Translate the following paragraph to Italian. add * before each verb in the text' },
          {
            role: 'user',
            content: paragraph,
          },
        ],
      });

      return { translation: completion.choices[0].message.content };
    } catch (error) {
      console.error('Error fetching translation from OpenAI:', error);
      return { translation: 'Error fetching translation. Please try again.' };
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route
          index
          element={
            <Italian
              description={description}
              handleIntroInputDone={handleIntroInputDone}
              handleNext={handleNext}
              fetchParagraph={fetchParagraph}
              fetchTranslation={fetchTranslation}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
