import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const FLASHCARDS_ENDPOINT = "http://localhost:3001/flashcards";

const FlashcardsContext = createContext();

function FlashcardsProvider({ children }) {
    const [flashcardsArray, setFlashcardsArray] = useState([]);

    const fetchFlashcards = async () => {
        const response = await axios.get(FLASHCARDS_ENDPOINT);
        setFlashcardsArray(response.data);
    };

    const addFlashcard = async (newItem) => {
        const response = await axios.post(FLASHCARDS_ENDPOINT, newItem);
        setFlashcardsArray([...flashcardsArray, response.data]);
    };

    const editFlashcardById = async (id, object) => {
        const response = await axios.put(`${FLASHCARDS_ENDPOINT}/${id}`, { ...object });
        const updatedFlashcards = flashcardsArray.map((item) => {
            if (item.id === id) {
                return { ...item, ...response.data };
            }
            return item;
        });
        setFlashcardsArray(updatedFlashcards);
    };

    const deleteFlashcardById = async (id) => {
        await axios.delete(`${FLASHCARDS_ENDPOINT}/${id}`);
        const updatedFlashcards = flashcardsArray.filter(
            (flashcardsArray) => flashcardsArray.id !== id
        );
        setFlashcardsArray(updatedFlashcards);
    };

    const value = {
        flashcardsArray,
        fetchFlashcards,
        addFlashcard,
        editFlashcardById,
        deleteFlashcardById,
    };
    return <FlashcardsContext.Provider value={value}>{children}</FlashcardsContext.Provider>;
}

export { FlashcardsProvider };
export default FlashcardsContext;
