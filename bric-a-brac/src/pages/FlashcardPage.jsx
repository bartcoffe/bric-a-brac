// import TextArea from "../components/TextInput";
// import CodeSnippet from "../components/CodeInput";
import useFlashcards from "../hooks/use-flashcards";
import { useEffect } from "react";

function FlashcardPage(props) {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const flashcard = flashcardsArray.find((x) => x.id === parseInt(props.id));

    return (
        <div>
            <p>{JSON.stringify(flashcard)}</p>
        </div>
    );
}
export default FlashcardPage;
