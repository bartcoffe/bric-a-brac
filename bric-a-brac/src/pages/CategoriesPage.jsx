import { useEffect } from "react";
import CreateCard from "../components/CreateCard";
import FlashcardThumbnail from "../components/FlashcardThumbnail";
import useFlashcardsContext from "../hooks/use-flashcards-context";
function CategoriesPage() {
    const { flashcardsArray, fetchFlashcards } = useFlashcardsContext();

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const renderedFlashcards = flashcardsArray.map((flashcard) => {
        return (
            // <FlashcardThumbnail />
            <div key={flashcard.id} className='border w-24 h-24'>
                <div>{flashcard.category}</div>
                <div>{flashcard.description}</div>
                <div>{flashcard.code}</div>
            </div>
        );
    });
    return (
        <div className='grid gap-8'>
            <div className='border grid justify-center'>
                <p className=''>be honest and answer: would you write this yourself?</p>
                <button className='border'>Try yourself</button>
            </div>
            <CreateCard classes='border' />
            <div className='grid gap-4'>
                <div className='flex gap-4'>{renderedFlashcards}</div>
            </div>
        </div>
    );
}

export default CategoriesPage;
