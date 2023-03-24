import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { SiPython, SiPostgresql, SiJavascript } from "react-icons/si";
import { DiJava, DiReact } from "react-icons/di";
import { TbBrandCpp, TbBrandGolang } from "react-icons/tb";

const FLASHCARDS_ENDPOINT = "http://localhost:3001/flashcards";

const FlashcardsContext = createContext();

function FlashcardsProvider({ children }) {
    const LANGUAGE_CATEGORIES = [
        {
            name: "python",
            icon: <SiPython />,
        },
        {
            name: "sql",
            icon: <SiPostgresql />,
        },
        {
            name: "javascript",
            icon: <SiJavascript />,
        },
        {
            name: "java",
            icon: <DiJava />,
        },
        {
            name: "c++",
            icon: <TbBrandCpp />,
        },
        {
            name: "go",
            icon: <TbBrandGolang />,
        },
    ];
    const STATUSES = {
        new: { name: "new", displayName: "new" },
        easy: { name: "easy", displayName: "easy" },
        moderate: { name: "moderate", displayName: "moderate" },
        ratherHard: { name: "ratherHard", displayName: "rather hard" },
        hard: { name: "hard", displayName: "hard" },
    };
    const [flashcardsArray, setFlashcardsArray] = useState([]);

    const fetchFlashcards = async () => {
        const response = await axios.get(FLASHCARDS_ENDPOINT);
        setFlashcardsArray(response.data);
    };

    const getDeckStatus = () => {
        return flashcardsArray.reduce(
            (accumulator, currentValue) => {
                if (currentValue.status === STATUSES.new.name) {
                    accumulator.new += 1;
                }
                if (currentValue.status === STATUSES.easy.name) {
                    accumulator.easy += 1;
                }
                if (currentValue.status === STATUSES.moderate.name) {
                    accumulator.moderate += 1;
                }
                if (currentValue.status === STATUSES.ratherHard.name) {
                    accumulator.ratherHard += 1;
                }
                if (currentValue.status === STATUSES.hard.name) {
                    accumulator.hard += 1;
                }
                return accumulator;
            },
            {
                new: 0,
                easy: 0,
                moderate: 0,
                ratherHard: 0,
                hard: 0,
            }
        );
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
        LANGUAGE_CATEGORIES,
        STATUSES,
        addFlashcard,
        editFlashcardById,
        deleteFlashcardById,
        fetchFlashcards,
        getDeckStatus,
    };
    return <FlashcardsContext.Provider value={value}>{children}</FlashcardsContext.Provider>;
}

export { FlashcardsProvider };
export default FlashcardsContext;
