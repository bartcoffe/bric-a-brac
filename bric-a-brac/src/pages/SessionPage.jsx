import FlashcardView from "../components/FlashcardView";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "../components/BoldP";
import { useState } from "react";
import Panel from "../components/Panel";
import useNavigation from "../hooks/use-navigation";
function SessionPage() {
    const { navigate } = useNavigation();
    const { STATUSES, flashcardsArray, fetchFlashcards, editFlashcardById } = useFlashcards();

    const [isCodeHidden, setIsCodeHidden] = useState(true);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);

    if (flashcardsArray.length === 0) {
        fetchFlashcards();
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }
    const handleCircleClick = (newStatus) => {
        const deckLength = flashcardsArray.length;
        if (currentFlashcard < deckLength - 1) {
            editFlashcardById(flashcardsArray[currentFlashcard].id, {
                ...flashcardsArray[currentFlashcard],
                status: newStatus,
            });
            setIsCodeHidden(true);
            setCurrentFlashcard((current) => current + 1);
        } else {
            editFlashcardById(flashcardsArray[currentFlashcard].id, {
                ...flashcardsArray[currentFlashcard],
                status: newStatus,
            });
            navigate("/");
        }
    };

    return (
        <div>
            <FlashcardView
                flashcard={flashcardsArray[currentFlashcard]}
                isCodeHidden={isCodeHidden}
            />
            ;
            {isCodeHidden && (
                <div className='text-center'>
                    <button
                        className='text-yellow-600 text-center'
                        onClick={() => setIsCodeHidden(false)}
                    >
                        see code
                    </button>
                </div>
            )}
            {isCodeHidden || (
                <Panel>
                    <BoldP className='text-center pb-6'>how was it?</BoldP>
                    <div className='flex justify-center gap-8'>
                        <div
                            onClick={() => handleCircleClick(STATUSES.hard.name)}
                            className='w-16 h-16 rounded-full bg-red-800 hover:bg-red-700 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>{STATUSES.hard.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.ratherHard.name)}
                            className='w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>{STATUSES.ratherHard.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.moderate.name)}
                            className='w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-400 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>{STATUSES.moderate.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.easy.name)}
                            className='w-16 h-16 rounded-full bg-emerald-700 hover:bg-emerald-600 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>{STATUSES.easy.displayName}</p>
                        </div>
                    </div>
                </Panel>
            )}
        </div>
    );
}
export default SessionPage;
