import React, { createContext, useState, useContext } from 'react';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

// Define your context
const ItalianContext = createContext();

// Define your provider
export const ItalianProvider = ({ children }) => {
  const [description, setDescription] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [verbDetails, setVerbDetails] = useState(null);
  const [verbDetailsLoading, setVerbDetailsLoading] = useState(false);
  const [clickedWords, setClickedWords] = useState({});
  const [loading, setLoading] = useState(false);
  const [nightMode, setNightMode] = useState(true);

  const model = 'gpt-4o-mini';
  let apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const openaiConfig = { apiKey, dangerouslyAllowBrowser: true };
  const openai = new OpenAI(openaiConfig);

  const VerbConjugation = z.object({
    io: z.string(),
    tu: z.string(),
    lui: z.string(),
    noi: z.string(),
    voi: z.string(),
    loro: z.string(),
  });

  const VerbAnalysisResponse = z.object({
    tense: z.string(),
    original_form: z.string(),
    grammatical_usage: z.string(),
    example_sentence: z.string(),
  });

  const VerbFullConjugation = z.object({
    analysis: VerbAnalysisResponse,
    present: VerbConjugation,
    past: VerbConjugation,
    imperfect: VerbConjugation,
    future_simple: VerbConjugation,
    subjunctive_present: VerbConjugation,
    subjunctive_past: VerbConjugation,
    conditional_present: VerbConjugation,
    imperative: VerbConjugation,
  });

  const handleIntroInputDone = async (data) => {
    console.log('italian context jsx    descriptioh set to  Data:', data);
    setDescription(data);
  };

  const fetchParagraph = async (description) => {
    if (loading) return; // Prevent overlapping calls
    setLoading(true);
    try {
      console.log('italian context Sending request to OpenAI with description:', description);
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
      console.log('italian context Sending request to OpenAI for translation of paragraph:', paragraph);
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
        console.log('Full conjugation JSON:', message.parsed); // Print the full conjugation JSON
        return message.parsed;
      } else {
        return { refusal: message.refusal };
      }
    };

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: `You are a helpful language tutor. Analyze the following Italian verb and provide:
            1. Its basic analysis (tense, original form, usage, example)
            2. Full conjugation in all the following forms:
               - Present tense
               - Past tense
               - Imperfect
               - Future Simple
               - Subjunctive Present
               - Subjunctive Past
               - Conditional Present
               - Imperative`
        },
        { role: 'user', content: word },
      ],
      response_format: zodResponseFormat(VerbFullConjugation, 'verbAnalysis'),
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

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <ItalianContext.Provider
      value={{
        description,
        paragraph,
        verbDetails,
        verbDetailsLoading,
        clickedWords,
        nightMode,
        setDescription,
        setParagraph,
        setVerbDetails,
        setVerbDetailsLoading,
        setClickedWords,
        handleIntroInputDone,
        fetchParagraph,
        fetchTranslation,
        fetchAskingAWord,
        toggleNightMode,
      }}
    >
      {children}
    </ItalianContext.Provider>
  );
};

// Custom hook to use the Italian context
export const useItalian = () => {
  return useContext(ItalianContext);
};
