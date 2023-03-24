import FlashcardView from "../components/FlashcardView";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "../components/BoldP";
import { useState } from "react";
import Panel from "../components/Panel";
import useNavigation from "../hooks/use-navigation";
import Button from "../components/Button";
function SessionPage({ selectedStatuses }) {
    const { navigate } = useNavigation();
    const { STATUSES, flashcardsArray, editFlashcardById } = useFlashcards();

    const [isCodeHidden, setIsCodeHidden] = useState(true);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);

    const filteredFlashcardsArray = flashcardsArray.filter((item) => {
        if (item.status === STATUSES.new.name) {
            if (selectedStatuses.new) {
                return item;
            }
        }
        if (item.status === STATUSES.hard.name) {
            if (selectedStatuses.hard) {
                return item;
            }
        }
        if (item.status === STATUSES.ratherHard.name) {
            if (selectedStatuses.ratherHard) {
                return item;
            }
        }
        if (item.status === STATUSES.moderate.name) {
            if (selectedStatuses.moderate) {
                return item;
            }
        }
        if (item.status === STATUSES.easy.name) {
            if (selectedStatuses.easy) {
                return item;
            }
        }
    });

    const handleCircleClick = (newStatus) => {
        const deckLength = filteredFlashcardsArray.length;
        if (currentFlashcard < deckLength - 1) {
            editFlashcardById(filteredFlashcardsArray[currentFlashcard].id, {
                ...filteredFlashcardsArray[currentFlashcard],
                status: newStatus,
            });
            setIsCodeHidden(true);
            setCurrentFlashcard((current) => current + 1);
        } else {
            editFlashcardById(filteredFlashcardsArray[currentFlashcard].id, {
                ...filteredFlashcardsArray[currentFlashcard],
                status: newStatus,
            });
            navigate("/");
        }
    };

    return (
        <div>
            <FlashcardView
                flashcard={filteredFlashcardsArray[currentFlashcard]}
                isCodeHidden={isCodeHidden}
            />
            {isCodeHidden && (
                <div className='text-center mt-4'>
                    <Button onClick={() => setIsCodeHidden(false)}>
                        <BoldP>see code</BoldP>
                    </Button>
                </div>
            )}
            {isCodeHidden || (
                <Panel>
                    <BoldP className='text-center pb-6'>how was it?</BoldP>
                    <div className='flex justify-center gap-8'>
                        <div
                            onClick={() => handleCircleClick(STATUSES.hard.name)}
                            className='w-14 h-14 rounded-full bg-red-800 hover:bg-red-700 duration-500 hover:scale-105 shadow-lg opacity-70'
                        >
                            <p className='invisible'>{STATUSES.hard.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.ratherHard.name)}
                            className='w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-500 duration-500 hover:scale-105 shadow-lg opacity-70'
                        >
                            <p className='invisible'>{STATUSES.ratherHard.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.moderate.name)}
                            className='w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 duration-500 hover:scale-105 shadow-lg opacity-70'
                        >
                            <p className='invisible'>{STATUSES.moderate.displayName}</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick(STATUSES.easy.name)}
                            className='w-14 h-14 rounded-full bg-emerald-700 hover:bg-emerald-600 duration-500 hover:scale-105 shadow-lg opacity-70'
                        >
                            <p className='invisible'>{STATUSES.easy.displayName}</p>
                        </div>
                    </div>
                </Panel>
            )}
            {
                <div className='text-neutral-800 text-right p-4'>
                    <p>{`${currentFlashcard + 1} / ${filteredFlashcardsArray.length}`}</p>
                </div>
            }
        </div>
    );
}
export default SessionPage;
