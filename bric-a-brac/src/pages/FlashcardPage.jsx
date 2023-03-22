import useFlashcards from "../hooks/use-flashcards";
import useNavigation from "../hooks/use-navigation";
import { AiFillDelete } from "react-icons/ai";
import FlashcardView from "../components/FlashcardView";
import BoldP from "../components/BoldP";

function FlashcardPage({ id }) {
    const { deleteFlashcardById, flashcardsArray, fetchFlashcards } = useFlashcards();
    const { navigate } = useNavigation();

    if (flashcardsArray.length === 0) {
        fetchFlashcards();
        console.log("flashcards context loading");
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }
    const flashcard = flashcardsArray.find((x) => x.id === parseInt(id));

    const handleDelete = () => {
        deleteFlashcardById(id);
        navigate("/");
    };

    return (
        <div>
            <FlashcardView flashcard={flashcard} />
            <div className='text-right mr-4'>
                <button
                    onClick={handleDelete}
                    className='bg-yellow-600 rounded-lg px-3 duration-500 hover:scale-105'
                >
                    <AiFillDelete />
                </button>
            </div>
        </div>
    );
}
export default FlashcardPage;
