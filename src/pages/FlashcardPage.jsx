import useFlashcards from "../hooks/use-flashcards";
import useNavigation from "../hooks/use-navigation";
import { AiFillDelete } from "react-icons/ai";
import FlashcardView from "../components/FlashcardView";
import BoldP from "../components/BoldP";
import Button from "../components/Button";
import { useEffect } from "react";

function FlashcardPage({ id }) {
    const { deleteFlashcardById, flashcardsArray, fetchFlashcards } = useFlashcards();
    const { navigate } = useNavigation();
    const flashcard = flashcardsArray.find((x) => x.id === id);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    if (!flashcard) {
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }

    const handleDelete = () => {
        deleteFlashcardById(id);
        navigate("/");
    };

    return (
        <div>
            <FlashcardView flashcard={flashcard} />
            <div className='text-right mr-4'>
                <Button onClick={handleDelete}>
                    <AiFillDelete />
                </Button>
            </div>
        </div>
    );
}
export default FlashcardPage;
