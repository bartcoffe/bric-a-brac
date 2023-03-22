import TextArea from "../components/TextArea";
import CodeSnippet from "../components/CodeSnippet";
import useFlashcards from "../hooks/use-flashcards";
import useNavigation from "../hooks/use-navigation";
import { CgHashtag } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import BoldP from "../components/BoldP";
import Panel from "../components/Panel";

function FlashcardPage({ id }) {
    const { flashcardsArray, languageCategories, deleteFlashcardById } = useFlashcards();
    const { navigate } = useNavigation();

    if (flashcardsArray.length === 0) {
        console.log("flashcards context loading");
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }

    const handleDelete = () => {
        deleteFlashcardById(id);
        navigate("/");
    };

    const flashcard = flashcardsArray.find((x) => x.id === parseInt(id));

    return (
        <div>
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
            <div className='text-right mr-4'>
                <button onClick={handleDelete} className='bg-yellow-600 rounded-lg px-3'>
                    <AiFillDelete />
                </button>
            </div>
        </div>
    );
}
export default FlashcardPage;
