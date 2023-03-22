import FlashcardView from "../components/FlashcardView";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "../components/BoldP";
function SessionPage() {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    if (flashcardsArray.length === 0) {
        fetchFlashcards();
        console.log("flashcards context loading");
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }
    return <FlashcardView flashcard={flashcardsArray[0]} />;
}
export default SessionPage;
