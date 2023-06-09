import CreateCard from "../components/CreateCard";
import TestYourself from "../components/TestYourself";
import FlashcardsShowcase from "../components/FlashcardsShowcase";
import YourLearning from "../components/YourLearning";
import Panel from "../components/Panel";
import useFlashcards from "../hooks/use-flashcards";
import { useEffect } from "react";
import Introduction from "../components/Introduction";

function CategoriesPage() {
    const { fetchFlashcards } = useFlashcards();
    useEffect(() => {
        fetchFlashcards();
    }, []);

    return (
        <div className='grid gap-4'>
            <Introduction />
            <div className='grid grid-cols-2 gap-4'>
                <TestYourself />
                <YourLearning />
            </div>
            <Panel>
                <CreateCard />
            </Panel>
            <Panel>
                <FlashcardsShowcase />
            </Panel>
        </div>
    );
}

export default CategoriesPage;
