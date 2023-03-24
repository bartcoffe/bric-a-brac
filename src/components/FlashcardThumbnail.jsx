import { CgHashtag } from "react-icons/cg";
import useNavigation from "../hooks/use-navigation";
import useFlashcards from "../hooks/use-flashcards";
import classNames from "classnames";

function FlashcardThumbnail({ flashcard }) {
    const { navigate } = useNavigation();
    const { LANGUAGE_CATEGORIES, STATUSES } = useFlashcards();

    const circleStyle = classNames("w-4 h-4 rounded-full opacity-60", {
        "bg-blue-700": flashcard.status === STATUSES.new.name,
        "bg-red-700": flashcard.status === STATUSES.hard.name,
        "bg-orange-500": flashcard.status === STATUSES.ratherHard.name,
        "bg-yellow-500": flashcard.status === STATUSES.moderate.name,
        "bg-emerald-700": flashcard.status === STATUSES.easy.name,
    });
    return (
        <div
            id={flashcard.id}
            onClick={() => {
                navigate(`/flashcard/${flashcard.id}`);
            }}
            key={flashcard.id}
            className='text-neutral-800 bg-neutral-200 p-4 rounded-lg cursor-pointer shadow-lg duration-500 hover:scale-105'
        >
            <div className='flex justify-start gap-2 mb-4'>
                <div className={circleStyle}></div>
                <div>{LANGUAGE_CATEGORIES.find((x) => x.name === flashcard.category).icon}</div>
            </div>
            <div className='flex gap-1 items-center'>
                <CgHashtag />
                <div>{flashcard.hashtag}</div>
            </div>
        </div>
    );
}
export default FlashcardThumbnail;
