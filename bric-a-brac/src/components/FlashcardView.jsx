import Panel from "./Panel";
import useFlashcards from "../hooks/use-flashcards";
import { CgHashtag } from "react-icons/cg";
import BoldP from "./BoldP";
import TextArea from "./TextArea";
import CodeSnippet from "./CodeSnippet";

function FlashcardView({ flashcard, isCodeHidden }) {
    const { LANGUAGE_CATEGORIES } = useFlashcards();
    return (
        <Panel>
            <div className='flex items-center gap-4 pb-4'>
                {LANGUAGE_CATEGORIES.find((x) => x.name === flashcard.category).icon}
                <div className='flex items-center gap-2'>
                    <CgHashtag size={30} />
                    <BoldP>{flashcard.hashtag}</BoldP>
                </div>
            </div>
            <TextArea>{flashcard.description}</TextArea>
            {isCodeHidden || (
                <CodeSnippet language={flashcard.category}>{flashcard.code}</CodeSnippet>
            )}
        </Panel>
    );
}

export default FlashcardView;
