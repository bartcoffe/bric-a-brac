import useNavigation from "../hooks/use-navigation";
function FlashcardThumbnail({ flashcard }) {
    const { navigate } = useNavigation();
    return (
        <div
            id={flashcard.id}
            onClick={() => {
                navigate(`/flashcard/${flashcard.id}`);
            }}
            key={flashcard.id}
            className='text-indigo-800 bg-indigo-300 rounded-lg border-4 border-indigo-400 flex gap-4 justify-center p-4 cursor-pointer'
        >
            <div>{flashcard.category}</div>
            <div>{flashcard.hashtag}</div>
        </div>
    );
}
export default FlashcardThumbnail;
