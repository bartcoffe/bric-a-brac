import { CgHashtag } from "react-icons/cg";
import useNavigation from "../hooks/use-navigation";
import useFlashcards from "../hooks/use-flashcards";
import classNames from "classnames";

function FlashcardThumbnail({ flashcard }) {
    const { navigate } = useNavigation();
    const { languageCategories } = useFlashcards();

    const circleStyle = classNames("w-5 h-5 rounded-full", {
        "bg-red-800": flashcard.status === "hard",
        "bg-blue-800": flashcard.status === "new",
        "bg-green-800": flashcard.status === "easy",
    });
    return (
        <div
            id={flashcard.id}
            onClick={() => {
                navigate(`/flashcard/${flashcard.id}`);
            }}
            key={flashcard.id}
            className='text-zinc-200 bg-zinc-800 p-4 rounded-xl cursor-pointer shadow-xl hover:bg-zinc-700'
        >
            <div className='flex justify-between mb-4'>
                <div>{languageCategories.find((x) => x.name === flashcard.category).icon}</div>
                <div className={circleStyle}></div>
            </div>
            <div className='flex gap-2 items-center'>
                <CgHashtag size={20} />
                <div>{flashcard.hashtag}</div>
            </div>
        </div>
    );
}
export default FlashcardThumbnail;
