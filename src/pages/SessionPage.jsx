import FlashcardView from "../components/FlashcardView";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "../components/BoldP";
import { useState, useRef } from "react";
import Panel from "../components/Panel";
import useNavigation from "../hooks/use-navigation";
import Button from "../components/Button";
function SessionPage({ filteredFlashcardsArray }) {
    const { navigate } = useNavigation();
    const { STATUSES, editFlashcardById } = useFlashcards();

    const [isCodeHidden, setIsCodeHidden] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const toEdit = useRef([]);

    const handleCircleClick = (newStatus) => {
        const deckLength = filteredFlashcardsArray.length;
        toEdit.current = [
            ...toEdit.current,
            { id: filteredFlashcardsArray[currentFlashcardIndex].id, updatedStatus: newStatus },
        ];
        if (currentFlashcardIndex < deckLength - 1) {
            setIsCodeHidden(true);
            setCurrentFlashcardIndex((current) => current + 1);
        } else {
            toEdit.current.forEach((item) => {
                editFlashcardById(item.id, {
                    ...filteredFlashcardsArray.find((x) => x.id === item.id),
                    status: item.updatedStatus,
                });
            });
            setIsFinished(true);
        }
    };

    return (
        <div>
            <FlashcardView
                flashcard={filteredFlashcardsArray[currentFlashcardIndex]}
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
            {isFinished && (
                <Panel className='text-center'>
                    <Button onClick={() => navigate("/")}>all done, return to homepage</Button>
                </Panel>
            )}
            {
                <div className='text-neutral-800 text-right p-4'>
                    <p>{`${currentFlashcardIndex + 1} / ${filteredFlashcardsArray.length}`}</p>
                </div>
            }
        </div>
    );
}
export default SessionPage;
