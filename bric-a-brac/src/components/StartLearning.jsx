import Panel from "./Panel";
import Button from "./Button";
function StartLearning() {
    return (
        <Panel>
            <p className='text-lg font-bold tracking-wide pb-6'>
                be honest and answer: hadn't you seen it, would you write it?
            </p>
            <Button>test yourself!</Button>
        </Panel>
    );
}
export default StartLearning;
