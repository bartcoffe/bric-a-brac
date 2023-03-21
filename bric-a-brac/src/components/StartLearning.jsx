import Panel from "./Panel";
import Button from "./Button";
function StartLearning() {
    return (
        <Panel>
            <div className='grid'>
                <p className='text-indigo-800'>
                    be honest and answer: would you write this yourself?
                </p>
                <Button>test yourself!</Button>
            </div>
        </Panel>
    );
}
export default StartLearning;
