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
import React from 'react';
import ParagraphTranslate from './components/ItalianBlocks/ParagraphTranslate';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

//region OpenAI
const model = 'gpt-4o-mini';

let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openaiConfig = { apiKey, dangerouslyAllowBrowser: true };
const openai = new OpenAI(openaiConfig);
//endregion

const VerbAnalysisResponse = z.object({
  tense: z.string(),
  original_form: z.string(),
  grammatical_usage: z.string(),
  example_sentence: z.string(),
});

const PresentTenseConjugation = z.object({
  io: z.string(),
  tu: z.string(),
  lui: z.string(),
  noi: z.string(),
  voi: z.string(),
  loro: z.string(),
});

const App = () => {
  const [description, setDescription] = useState('');

  const handleIntroInputDone = async (data) => {
    console.log('app jsx    descriptioh set to  Data:', data);
    setDescription(data);
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
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: 'you are a long paragraph writer. you will write as much as possible about everyday stuff.you should always use basic words, as if you are talking to a new speaker who is learning the language.  the user will describe a sitation or subject to talk about. and you will follow it. using everyday words that a person should know as a beginner in a language. give 50 words maximum' },
          { role: 'user', content: `The paragraph should be about: ${description}` },
        ],
      });

      return { paragraph: completion.choices[0].message.content };
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

  const searchVerb = async (word) => {
    
    const handleCompletion = (completion) => {
      const message = completion.choices[0]?.message;
      if (message?.parsed) {
        return {
          analysis: message.parsed.analysis,
          presentTenseConjugation: message.parsed.present,
        };
      } else {
        return { refusal: message.refusal };
      }
    };
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful language tutor. Analyze the following Italian verb and provide its tense, original form, grammatical usage, and use it in a simple example sentence. Also, provide the present tense conjugation for io, tu, lui, noi, voi, loro.',
        },
        { role: 'user', content: word },
      ],
      response_format: zodResponseFormat(
        z.object({
          analysis: VerbAnalysisResponse,
          present: PresentTenseConjugation,
        }),
        'verbAnalysis'
      ),
    });

    return handleCompletion(completion);
  };


  const fetchAskingAWord = async (word, isVerb) => {
    if (isVerb) {
      return await searchVerb(word);
    }
  
    try {
      console.log(`Sending request to OpenAI for word translation:`, word);
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: 'You are a translator. Translate the following word to Italian.' },
          {
            role: 'user',
            content: word,
          },
        ],
      });
  
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching word translation from OpenAI:', error);
      throw error;
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
              fetchAskingAWord={fetchAskingAWord}
            />
          }
        />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
