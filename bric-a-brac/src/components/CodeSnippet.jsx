import Highlight from "react-highlight";

function CodeSnippet({ children, language }) {
    return (
        <Highlight className='bg-zinc-800 rounded-xl p-4' language={language}>
            {children}
        </Highlight>
    );
}

export default CodeSnippet;
