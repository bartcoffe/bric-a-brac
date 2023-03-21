import Panel from "./Panel";
import useFlashcards from "../hooks/use-flashcards";

function YourLearning() {
    const { flashcardsArray } = useFlashcards();

    return (
        <Panel>
            <div>
                <p className='text-lg font-bold tracking-wide pb-2'>your learning: </p>
            </div>
            <div>
                <div className='flex justify-center'>
                    <p className='w-20'>all:</p>
                    <p className='font-bold'>10</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20'>new: </p>
                    <p className='font-bold text-blue-700'>4</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20'>easy: </p>
                    <p className='font-bold text-green-700'>4</p>
                </div>
                <div className='flex justify-center'>
                    <p className='w-20'>hard: </p>
                    <p className='font-bold text-red-700'>2</p>
                </div>
            </div>
        </Panel>
    );
}
export default YourLearning;
