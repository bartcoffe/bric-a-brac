import useFlashcards from "../hooks/use-flashcards";
import BoldP from "./BoldP";
import FlashcardThumbnail from "./FlashcardThumbnail";
function FlashcardsShowcase() {
    const { flashcardsArray } = useFlashcards();
    let renderedFlashcards = flashcardsArray.map((flashcard) => {
        return <FlashcardThumbnail key={flashcard.id} flashcard={flashcard} />;
    });

    return (
        <div>
            <div className='pb-6'>
                <BoldP>current deck:</BoldP>
            </div>
            <div className='flex gap-4 justify-center flex-wrap'>{renderedFlashcards}</div>
        </div>
    );
}

export default FlashcardsShowcase;
