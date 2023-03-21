import { useEffect } from "react";
import useFlashcards from "../hooks/use-flashcards";
import FlashcardThumbnail from "./FlashcardThumbnail";
function FlashcardsShowcase() {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    useEffect(() => {
        fetchFlashcards();
    }, []);

    let renderedFlashcards = flashcardsArray.map((flashcard) => {
        return <FlashcardThumbnail key={flashcard.id} flashcard={flashcard} />;
    });

    return (
        <div>
            <div className='pb-6'>
                <p className='text-lg font-bold tracking-wide pb-2'>current deck</p>
            </div>
            <div className='flex gap-4 justify-center flex-wrap'>{renderedFlashcards}</div>
        </div>
    );
}

export default FlashcardsShowcase;
