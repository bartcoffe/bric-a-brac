import { useContext } from "react";
import FlashcardsContext from "../context/flashcards";

function useFlashcards() {
    return useContext(FlashcardsContext);
}

export default useFlashcards;
