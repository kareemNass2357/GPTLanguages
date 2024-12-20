export const formatText = (text, highlightedLine, handleMouseEnter, handleMouseLeave, fontSize) => {
  const sentences = text.split('.');
  const formattedSentences = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    if (sentence.length < 5 && i < sentences.length - 1) {
      formattedSentences.push(`${sentence}. ${sentences[i + 1].trim()}`);
      i++; // Skip the next sentence as it has been concatenated
    } else {
      formattedSentences.push(sentence);
    }
  }

  return formattedSentences.map((sentence, index) => (
    <p
      key={index}
      className={`paragraph-line text-left ${highlightedLine === index + 1 ? 'highlight' : ''} new-line`}
      style={{ backgroundColor: highlightedLine === index + 1 ? 'rgba(255, 255, 0, 0.5)' : 'transparent', lineHeight: '3', fontSize: `${fontSize}px` }}
      onMouseEnter={() => handleMouseEnter(index + 1)}
      onMouseLeave={handleMouseLeave}
    >
      {sentence.trim() + '.'}
    </p>
  ));
};
