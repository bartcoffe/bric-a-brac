import { useEffect } from "react";
import useFlashcards from "../hooks/use-flashcards";
import FlashcardThumbnail from "./FlashcardThumbnail";

function FlashcardsShowcase() {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const renderedFlashcards = flashcardsArray.map((flashcard) => {
        return <FlashcardThumbnail key={flashcard.id} flashcard={flashcard} />;
    });

    return (
        <div className='grid gap-4 text-indigo-800 bg-indigo-300 rounded-lg border-4 border-indigo-400 flex gap-4 justify-center p-4'>
            <div className='text-indigo-800 bg-indigo-300 rounded-lg border-4 border-indigo-400 flex gap-4 justify-center p-4'>
                <div>
                    <p>your snippets</p>
                </div>
                <div>
                    <p>all: 10</p>
                    <p>new: 4</p>
                    <p>easy: 4</p>
                    <p>hard: 2</p>
                </div>
            </div>
            <div className='flex gap-4 justify-center flex-wrap'>{renderedFlashcards}</div>
        </div>
    );
}

export default FlashcardsShowcase;
