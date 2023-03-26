import { createContext, useState } from "react";
import axios from "axios";
import { SiPython, SiPostgresql, SiJavascript } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { TbBrandCpp, TbBrandGolang } from "react-icons/tb";

const FLASHCARDS_ENDPOINT = `${import.meta.env.VITE_ENDPOINT}flashcards/`;
const LOGGED_USER = "sample_user";
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
        if (!flashcardsArray.length) {
            const response = await axios.get(`${FLASHCARDS_ENDPOINT}${LOGGED_USER}`);
            console.log(response.data);
            setFlashcardsArray(response.data);
        }
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
        const response = await axios.put(`${FLASHCARDS_ENDPOINT}${LOGGED_USER}`, newItem);
        setFlashcardsArray([...flashcardsArray, response.data]);
    };

    const editFlashcardStatus = async (objectsToUpdate) => {
        for (const object of objectsToUpdate) {
            await axios.put(`${FLASHCARDS_ENDPOINT}${LOGGED_USER}/${object.id}`, { ...object });
        }

        const updatedFlashcards = flashcardsArray.map((flashcard) => {
            let updatedFlashcard = {};
            for (const object of objectsToUpdate) {
                if (object.id === flashcard.id) {
                    updatedFlashcard = {
                        ...flashcard,
                        status: object.status,
                    };
                }
            }
            return updatedFlashcard.id === undefined ? { ...flashcard } : updatedFlashcard;
        });

        setFlashcardsArray(() => updatedFlashcards);
    };

    const deleteFlashcardById = async (id) => {
        await axios.delete(`${FLASHCARDS_ENDPOINT}${LOGGED_USER}/${id}`);
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
        editFlashcardStatus,
        deleteFlashcardById,
        fetchFlashcards,
        getDeckStatus,
    };
    return <FlashcardsContext.Provider value={value}>{children}</FlashcardsContext.Provider>;
}

export { FlashcardsProvider };
export default FlashcardsContext;
