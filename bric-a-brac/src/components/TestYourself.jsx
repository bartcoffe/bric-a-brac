import Panel from "./Panel";
import Button from "./Button";
import BoldP from "./BoldP";
function TestYourself() {
    return (
        <Panel>
            <BoldP className='pb-4'>
                be honest and answer: hadn't you seen it, would you write it?
            </BoldP>
            <Button>start learning session</Button>
        </Panel>
    );
}
export default TestYourself;
