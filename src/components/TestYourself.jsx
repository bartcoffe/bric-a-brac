import Panel from "./Panel";
import Button from "./Button";
import BoldP from "./BoldP";
import useNavigation from "../hooks/use-navigation";
function TestYourself() {
    const { navigate } = useNavigation();
    return (
        <Panel className='flex flex-col justify-around'>
            <BoldP className='pb-8'>
                be honest and answer: hadn't you seen it, would you write it?
            </BoldP>
            <Button onClick={() => navigate("/filtered-session")}>start learning session</Button>
        </Panel>
    );
}
export default TestYourself;
