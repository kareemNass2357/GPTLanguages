import React, { useState } from 'react';
import { useItalian } from '../../context/ItalianContext';
import './animations.css'; // Import the CSS file

const ConjugationPanel = ({ tense, conjugations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { nightMode } = useItalian();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border border-gray-300 p-4 m-2 rounded shadow-md transform transition-transform hover:scale-105 ${isOpen ? 'panel-open' : 'panel-closed'} ${nightMode ? 'night-mode' : ''}`} style={{ flex: '1 1 calc(33.333% - 1rem)', maxWidth: 'calc(33.333% - 1rem)' }}>
      <h4 className="text-md font-bold text-center text-blue-600 cursor-pointer" onClick={togglePanel} style={{ paddingTop: '5px' }}>
        {tense.replace('_', ' ').toUpperCase()}
      </h4>
      <div className={`panel-content ${isOpen ? 'open' : 'closed'}`}>
        <table className="w-full mt-2 zigzag-table">
          <tbody>
            {Object.entries(conjugations).map(([pronoun, conjugation], index) => (
              <tr key={pronoun} className={`hover:bg-gray-100 transition-colors zigzag-row-${index % 2 === 0 ? 'left' : 'right'}`}>
                <td className="font-semibold text-right pr-2">{pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}:</td>
                <td className="text-left pl-2">{conjugation || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VerbDetails = ({ details }) => {
  const { nightMode } = useItalian();

  if (!details) {
    console.log('No details or analysis found:', details);
    return <p>Loading verb details...</p>; // Render loading message
  }
  console.log('Details from verbdetails component:', details);

  const { analysis, ...conjugations } = details;
  console.log('Analysis:', analysis);
  console.log('Conjugations:', conjugations);
  // show me all the keys in the anlysis object
return (
  <div className={`border border-black p-5 m-2 rounded w-full md:w-[70vw] overflow-auto expand-animation ${nightMode ? 'night-mode' : ''}`}>
    <h3 className="text-lg font-bold text-center text-red-600">Verb Analysis</h3>
    {analysis && analysis.tense && <p className="text-center"><strong>Tense:</strong> {analysis.tense}</p>}
    {analysis && analysis.original_form && <p className="text-center"><strong>Original Form:</strong> {analysis.original_form}</p>}
    {analysis && analysis.grammatical_usage && <p className="text-center"><strong>Grammatical Usage:</strong> {analysis.grammatical_usage}</p>}
    {analysis && analysis.example_sentence && <p className="text-center"><strong>Example Sentence:</strong> {analysis.example_sentence}</p>}
    <div className="flex flex-wrap justify-center">
      {Object.keys(conjugations).map((tense) => (
        <ConjugationPanel key={tense} tense={tense} conjugations={conjugations[tense]} />
      ))}
    </div>
  </div>
);
}
export default VerbDetails;