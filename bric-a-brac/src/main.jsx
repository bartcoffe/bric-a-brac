import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import { NavigationProvider } from "./context/navigation";
import { FlashcardsProvider } from "./context/flashcards";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NavigationProvider>
            <FlashcardsProvider>
                <App />
            </FlashcardsProvider>
        </NavigationProvider>
    </React.StrictMode>
);
