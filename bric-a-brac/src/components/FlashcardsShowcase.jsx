import { useEffect } from "react";
import useFlashcards from "../hooks/use-flashcards";
import FlashcardThumbnail from "./FlashcardThumbnail";
import Panel from "./Panel";

function FlashcardsShowcase() {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const renderedFlashcards = flashcardsArray.map((flashcard) => {
        return <FlashcardThumbnail key={flashcard.id} flashcard={flashcard} />;
    });

    return (
        <Panel>
            <div className='flex gap-4 justify-start flex-wrap'>{renderedFlashcards}</div>
        </Panel>
    );
}

export default FlashcardsShowcase;
