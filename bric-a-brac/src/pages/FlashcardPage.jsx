import TextArea from "../components/TextArea";
import CodeSnippet from "../components/CodeSnippet";
import useFlashcards from "../hooks/use-flashcards";
import { CgHashtag } from "react-icons/cg";
import BoldP from "../components/BoldP";
import Panel from "../components/Panel";

function FlashcardPage({ id }) {
    const { flashcardsArray, languageCategories } = useFlashcards();

    if (flashcardsArray.length === 0) {
        console.log("flashcards context loading");
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }

    const flashcard = flashcardsArray.find((x) => x.id === parseInt(id));

    return (
        <Panel>
            <div className='flex items-center gap-4 pb-4'>
                {languageCategories.find((x) => x.name === flashcard.category).icon}
                <div className='flex items-center gap-2'>
                    <CgHashtag size={30} />
                    <BoldP>{flashcard.hashtag}</BoldP>
                </div>
            </div>
            <TextArea>{flashcard.description}</TextArea>
            <CodeSnippet language={flashcard.category}>{flashcard.code}</CodeSnippet>
        </Panel>
    );
}
export default FlashcardPage;
