import Panel from "./Panel";
function Introduction() {
    return (
        <Panel>
            <p className='p-2'>
                <em>bric-à-brac,</em> first used in the Victorian era, around 1840, refers to
                lesser objets d'art forming collections of curios.
            </p>
            <div className='px-2'>
                <p> Add your code snippets and then learn them:</p>
                <ul className='p-2'>
                    <li>look at the description</li>
                    <li>think of ways you'd solve it</li>
                    <li>opt for a solution and uncover the snippet</li>
                    <li>did you get it right? estimate how hard it was</li>
                </ul>
            </div>
        </Panel>
    );
}
export default Introduction;
