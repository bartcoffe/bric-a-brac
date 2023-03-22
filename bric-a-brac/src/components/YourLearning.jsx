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
            if (currentValue.status === "moderate") {
                accumulator.moderate += 1;
            }
            if (currentValue.status === "rather hard") {
                accumulator.ratherHard += 1;
            }
            if (currentValue.status === "hard") {
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

    return (
        <Panel>
            <div className='flex gap-12'>
                <div className=''>
                    <BoldP>your learning: </BoldP>
                </div>
                <div>
                    <div className='flex pt-1'>
                        <p className='w-24'>all:</p>
                        <p className='font-bold'>
                            {Object.values(deckStatus).reduce((acc, val) => acc + val)}
                        </p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>new: </p>
                        <p className='font-bold text-blue-800'>{deckStatus.new}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>easy: </p>
                        <p className='font-bold text-emerald-700'>{deckStatus.easy}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>moderate: </p>
                        <p className='font-bold text-yellow-500'>{deckStatus.moderate}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>rather hard: </p>
                        <p className='font-bold text-red-600'>{deckStatus.hard}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>hard: </p>
                        <p className='font-bold text-red-800'>{deckStatus.hard}</p>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
export default YourLearning;
