import Panel from "./Panel";
import useFlashcards from "../hooks/use-flashcards";
import BoldP from "./BoldP";

function YourLearning() {
    const { STATUSES, getDeckStatus } = useFlashcards();

    const deckStatus = getDeckStatus();

    return (
        <Panel>
            <div className='flex justify-start pb-2'>
                <div className='basis-11/12'>
                    <div className='pb-2'>
                        <BoldP>your learning </BoldP>
                    </div>
                    <div className='bg-neutral-200 p-2 rounded-lg shadow-lg'>
                        <div className='flex justify-between'>
                            <p>all:</p>
                            <p className='font-bold opacity-80'>
                                {Object.values(deckStatus).reduce((acc, val) => acc + val)}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{STATUSES.new.displayName} </p>
                            <p className='font-bold text-blue-800 opacity-80'>{deckStatus.new}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{STATUSES.easy.displayName}: </p>
                            <p className='font-bold text-emerald-700 opacity-80'>
                                {deckStatus.easy}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{STATUSES.moderate.displayName}: </p>
                            <p className='font-bold text-yellow-500 opacity-80'>
                                {deckStatus.moderate}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{STATUSES.ratherHard.displayName}: </p>
                            <p className='font-bold text-red-600 opacity-80'>
                                {deckStatus.ratherHard}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{STATUSES.hard.displayName}: </p>
                            <p className='font-bold text-red-800 opacity-80'>{deckStatus.hard}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
export default YourLearning;
