import React from 'react';
import './animations.css'; // Import the CSS file

const ConjugationPanel = ({ tense, conjugations }) => (
  <div className="border border-gray-300 p-4 m-2 rounded shadow-md">
    <h4 className="text-md font-bold mt-2">{tense.replace('_', ' ').toUpperCase()}</h4>
    {Object.entries(conjugations).map(([pronoun, conjugation]) => (
      <p key={pronoun}><strong>{pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}:</strong> {conjugation || 'N/A'}</p>
    ))}
  </div>
);

const VerbDetails = ({ details }) => {
  if (!details) {
    console.log('No details or analysis found:', details);
    return <p>Loading verb details...</p>; // Render loading message
  }
  console.log('Details from verbdetails component:', details);

  const { analysis, ...conjugations } = details;
  console.log('Analysis:', analysis);
  console.log('Conjugations:', conjugations);

  return (
    <div className="border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation">
      <h3 className="text-lg font-bold">Verb Analysis</h3>
      <p><strong>Tense:</strong> {analysis.tense || 'N/A'}</p>
      <p><strong>Original Form:</strong> {analysis.original_form || 'N/A'}</p>
      <p><strong>Grammatical Usage:</strong> {analysis.grammatical_usage || 'N/A'}</p>
      <p><strong>Example Sentence:</strong> {analysis.example_sentence || 'N/A'}</p>
      {Object.keys(conjugations).map((tense) => (
        <ConjugationPanel key={tense} tense={tense} conjugations={conjugations[tense]} />
      ))}
    </div>
  );
};

export default VerbDetails;
