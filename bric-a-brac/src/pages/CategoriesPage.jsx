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
        <div>
            <CreateCard />
            <div>{renderedFlashcards}</div>
        </div>
    );
}

export default CategoriesPage;
