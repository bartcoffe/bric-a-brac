import Panel from "./Panel";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "./BoldP";

function YourLearning() {
    const { flashcardsArray, STATUSES } = useFlashcards();

    const deckStatus = flashcardsArray.reduce(
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
                        <p className='w-24'>{STATUSES.new.displayName} </p>
                        <p className='font-bold text-blue-800'>{deckStatus.new}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>{STATUSES.easy.displayName}: </p>
                        <p className='font-bold text-emerald-700'>{deckStatus.easy}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>{STATUSES.moderate.displayName}: </p>
                        <p className='font-bold text-yellow-500'>{deckStatus.moderate}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>{STATUSES.ratherHard.displayName}: </p>
                        <p className='font-bold text-red-600'>{deckStatus.ratherHard}</p>
                    </div>
                    <div className='flex'>
                        <p className='w-24'>{STATUSES.hard.displayName}: </p>
                        <p className='font-bold text-red-800'>{deckStatus.hard}</p>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
export default YourLearning;
