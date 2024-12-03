import React, { Component, useEffect, useState } from 'react';
import { useItalian } from '../../context/ItalianContext';
import VerbDetails from './VerbDetails';
import WordDetails from './WordDetails';

const TranslateWord = ({ word, isVerb }) => {
  const { fetchAskingAWord, setVerbDetails, setVerbDetailsLoading, setWordDetails } = useItalian();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [prevWord, setPrevWord] = useState('');

  useEffect(() => {
    if (word !== prevWord) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await fetchAskingAWord(word, isVerb);
          setDetails(details);
          if (isVerb) {
            setVerbDetails(details);
          } else {
            setWordDetails(details);
          }
          setPrevWord(word);
        } catch (error) {
          console.error('Error fetching details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [word, isVerb, fetchAskingAWord, setVerbDetails, setWordDetails, prevWord]);

  if (loading) {
    return <p>Loading details...</p>;
  }

  ComponentToReturn = isVerb ? VerbDetails : WordDetails

  return <ComponentToReturn details={details} />;
};

export default TranslateWord;
