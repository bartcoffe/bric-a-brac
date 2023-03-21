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
            className='text-zinc-200 bg-zinc-800 rounded-lg p-8 cursor-pointer shadow-xl hover:bg-zinc-700'
        >
            <div>{flashcard.category}</div>
            <div>{flashcard.hashtag}</div>
        </div>
    );
}
export default FlashcardThumbnail;
