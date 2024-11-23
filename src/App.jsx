import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Italian from './pages/Italian';
import OpenAI from 'openai';
import { useState } from 'react';

//region OpenAI
let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openaiConfig = {apiKey, dangerouslyAllowBrowser: true };
console.log('OpenAI Key:', apiKey);
const openai = new OpenAI(openaiConfig);
//endregion

const App = () => {
  const [description, setDescription] = useState('');

  const handleIntroInputDone = (data) => {
    console.log('Intro Input Data:', data);
    setDescription(data);
  };

  const handleNext = () => {
    console.log('Next button clicked');
  };

  const fetchParagraph = async (description) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'you are a long paragraph writer. you will write as much as possible about everyday stuff.you should always use basic words, as if you are talking to a new speaker who is learning the language.  the user will describe a sitation or subject to talk about. and you will follow it. using everyday words that a person should know as a beginner in a language' },
          {
            role: 'user',
            content: `The paragraph should be about: ${description}`,
          },
        ],
      });

      return { paragraph: completion.choices[0].message.content };
    } catch (error) {
      console.error('Error fetching paragraph from OpenAI:', error);
      return { paragraph: 'Error fetching paragraph. Please try again.' };
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
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
