import { createContext } from "react";
import { useState } from "react";
const FlashcardsContext = createContext();

function Provider({ children }) {
    const [flashcardsArray, setFlascardsArray] = useState([]);

    const addFlashcard = (newItem) => {
        setFlascardsArray({
            ...flashcardsArray,
            newItem,
        });
    };

    const value = {
        flashcardsArray,
        addFlashcard,
    };
    return <FlashcardsContext.Provider value={value}>{children}</FlashcardsContext.Provider>;
}

export { Provider };
export default FlashcardsContext;
