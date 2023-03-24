import classNames from "classnames";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeSnippet({ children, language }) {
    const className = classNames("m-2 py-6 bg-neutral-100 break-all max-w-xl", language);

    return (
        <div className={className}>
            <SyntaxHighlighter wrapLongLines={true} language={language} style={docco}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeSnippet;
