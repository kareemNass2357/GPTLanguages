import React from 'react';

const VerbDetails = ({ details }) => {
  if (!details || !details.analysis) {
    console.log('No details or analysis found:', details);
    return <p>Loading verb details...</p>; // Render loading message
  }
  console.log('Details from verbdetails component:', details);

  const { analysis, presentTenseConjugation } = details;
  console.log('Analysis:', analysis);
  console.log('Present:', presentTenseConjugation);

  return (
    <div className="border border-black p-5 m-2 rounded">
      <h3 className="text-lg font-bold">Verb Analysis</h3>
      <p><strong>Tense:</strong> {analysis.tense || 'N/A'}</p>
      <p><strong>Original Form:</strong> {analysis.original_form || 'N/A'}</p>
      <p><strong>Grammatical Usage:</strong> {analysis.grammatical_usage || 'N/A'}</p>
      <p><strong>Example Sentence:</strong> {analysis.example_sentence || 'N/A'}</p>
      <h4 className="text-md font-bold mt-2">Present Tense Conjugation</h4>
      {presentTenseConjugation ? (
        <>
          <p><strong>Io:</strong> {presentTenseConjugation.io || 'N/A'}</p>
          <p><strong>Tu:</strong> {presentTenseConjugation.tu || 'N/A'}</p>
          <p><strong>Lui:</strong> {presentTenseConjugation.lui || 'N/A'}</p>
          <p><strong>Noi:</strong> {presentTenseConjugation.noi || 'N/A'}</p>
          <p><strong>Voi:</strong> {presentTenseConjugation.voi || 'N/A'}</p>
          <p><strong>Loro:</strong> {presentTenseConjugation.loro || 'N/A'}</p>
        </>
      ) : (
        <p>Present tense conjugation data is missing.</p>
      )}
    </div>
  );
};

export default VerbDetails;
