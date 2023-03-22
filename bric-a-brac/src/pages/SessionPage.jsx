import FlashcardView from "../components/FlashcardView";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "../components/BoldP";
import { useState } from "react";
import Panel from "../components/Panel";
function SessionPage() {
    const { flashcardsArray, fetchFlashcards } = useFlashcards();

    const [isCodeHidden, setIsCodeHidden] = useState(true);

    if (flashcardsArray.length === 0) {
        fetchFlashcards();
        console.log("flashcards context loading");
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }
    const handleCircleClick = (val) => {
        console.log("clicked", val);
    };

    return (
        <div>
            <FlashcardView flashcard={flashcardsArray[0]} isCodeHidden={isCodeHidden} />;
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
                            onClick={() => handleCircleClick("hard")}
                            className='w-16 h-16 rounded-full bg-red-800 hover:bg-red-700 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>hard</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick("rather hard")}
                            className='w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>rather hard</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick("moderate")}
                            className='w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-400 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>moderate</p>
                        </div>
                        <div
                            onClick={() => handleCircleClick("easy")}
                            className='w-16 h-16 rounded-full bg-emerald-700 hover:bg-emerald-600 duration-500 hover:scale-105 shadow-xl'
                        >
                            <p className='invisible'>easy</p>
                        </div>
                    </div>
                </Panel>
            )}
        </div>
    );
}
export default SessionPage;
