import TextArea from "../components/TextArea";
import CodeSnippet from "../components/CodeSnippet";
import useFlashcards from "../hooks/use-flashcards";
import { useEffect } from "react";
import { CgHashtag } from "react-icons/cg";
import BoldP from "../components/BoldP";
import Panel from "../components/Panel";

function FlashcardPage({ id }) {
    const { flashcardsArray, fetchFlashcards, languageCategories } = useFlashcards();

    useEffect(() => {
        fetchFlashcards();
    }, []);

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
            <CodeSnippet>{flashcard.code}</CodeSnippet>
        </Panel>
    );
}
export default FlashcardPage;
