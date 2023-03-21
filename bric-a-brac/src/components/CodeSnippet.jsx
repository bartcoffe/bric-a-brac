import Panel from "./Panel";
import Highlight from "react-highlight";

function CodeSnippet({ children, ...rest }) {
    return (
        <Highlight className='bg-zinc-800 rounded-xl p-4' language='javascript'>
            {children}
        </Highlight>
    );
}

export default CodeSnippet;
