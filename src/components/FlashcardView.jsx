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
                <div className='text-xl'>
                    {LANGUAGE_CATEGORIES.find((x) => x.name === flashcard.category).icon}
                </div>
                <div className='flex items-center gap-2'>
                    <CgHashtag />
                    <BoldP>{flashcard.hashtag}</BoldP>
                </div>
            </div>
            <TextArea readOnly value={flashcard.description} />
            {isCodeHidden || (
                <CodeSnippet language={flashcard.category}>{flashcard.code}</CodeSnippet>
            )}
        </Panel>
    );
}

export default FlashcardView;
