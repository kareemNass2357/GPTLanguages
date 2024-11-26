import React from 'react';

const VerbDetails = ({ details }) => {
  if (!details || !details.tense) {
    return null; // or render a fallback UI
  }

  const { analysis, present } = details;

  return (
    <div className="border border-black p-5 m-2 rounded">
      <h3 className="text-lg font-bold">Verb Analysis</h3>
      <p><strong>Tense:</strong> {analysis.tense}</p>
      <p><strong>Original Form:</strong> {analysis.original_form}</p>
      <p><strong>Grammatical Usage:</strong> {analysis.grammatical_usage}</p>
      <p><strong>Example Sentence:</strong> {analysis.example_sentence}</p>
      <h4 className="text-md font-bold mt-2">Present Tense Conjugation</h4>
      <p><strong>Io:</strong> {present.io}</p>
      <p><strong>Tu:</strong> {present.tu}</p>
      <p><strong>Lui:</strong> {present.lui}</p>
      <p><strong>Noi:</strong> {present.noi}</p>
      <p><strong>Voi:</strong> {present.voi}</p>
      <p><strong>Loro:</strong> {present.loro}</p>
    </div>
  );
};

export default VerbDetails;
