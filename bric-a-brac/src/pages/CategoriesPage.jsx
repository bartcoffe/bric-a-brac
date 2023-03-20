import CreateCard from "../components/CreateCard";
import useFlashcardsContext from "../hooks/use-flashcards-context";
function CategoriesPage() {
    const { flashcardsArray } = useFlashcardsContext();

    const renderedFlashcards = flashcardsArray.map((flashcard) => {
        return (
            <div className='border w-24 h-24'>
                <div>{flashcard.category}</div>
                <div>{flashcard.description}</div>
                <div>{flashcard.code}</div>
            </div>
        );
    });
    return (
        <div className='grid gap-8'>
            <div className='border'>
                <p>be honest and answer: would you write this yourself?</p>
                <button className='border'>Try yourself</button>
            </div>
            <CreateCard classes='border' />
            <div className='grid gap-4'>
                <div>
                    <p>learn by category</p>
                </div>
                <div className='flex'>{renderedFlashcards}</div>
            </div>
        </div>
    );
}

export default CategoriesPage;
