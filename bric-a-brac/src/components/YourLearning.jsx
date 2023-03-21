import Panel from "./Panel";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "./BoldP";

function YourLearning() {
    const { flashcardsArray } = useFlashcards();
    const deckStatus = flashcardsArray.reduce(
        (accumulator, currentValue) => {
            if (currentValue.status === "new") {
                accumulator.new += 1;
            }
            if (currentValue.status === "easy") {
                accumulator.easy += 1;
            }
            if (currentValue.status === "hard") {
                accumulator.hard += 1;
            }
            return accumulator;
        },
        {
            new: 0,
            easy: 0,
            hard: 0,
        }
    );

    return (
        <Panel>
            <div className='flex gap-12'>
                <div className=''>
                    <BoldP>your learning: </BoldP>
                </div>
                <div>
                    <div className='flex pt-1'>
                        <p className='w-20'>all:</p>
                        <p className='font-bold'>
                            {Object.values(deckStatus).reduce((acc, val) => acc + val)}
                        </p>
                    </div>
                    <div className='flex'>
                        <p className='w-20'>new: </p>
                        <p className='font-bold text-blue-800'>{deckStatus.new}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-20'>easy: </p>
                        <p className='font-bold text-green-800'>{deckStatus.easy}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-20'>hard: </p>
                        <p className='font-bold text-red-800'>{deckStatus.hard}</p>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
export default YourLearning;
