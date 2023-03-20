import { useContext } from "react";
import FlashcardsContext from "../context/flashcards";

function useFlashcardsContext() {
    return useContext(FlashcardsContext);
}

export default useFlashcardsContext;
