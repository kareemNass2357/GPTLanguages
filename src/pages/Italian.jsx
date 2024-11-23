import IntroInput from '../components/ItalianBlocks/IntroInput';
import FirstParagraph from '../components/ItalianBlocks/FirstParagraph';

const Italian = ({ description, handleIntroInputDone, handleNext, fetchParagraph }) => {
  return (
    <section className='flex flex-col justify-center items-center h-full'>
      <p> this is the first lineees </p>
      <IntroInput onDone={handleIntroInputDone} />
      {description && (
        <FirstParagraph description={description} onNext={handleNext} fetchParagraph={fetchParagraph} />
      )}
    </section>
  );
};

export default Italian;
