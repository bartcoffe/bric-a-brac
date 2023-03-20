import CreateCard from "../components/CreateCard";
import useFlashcardsContext from "../hooks/use-flashcards-context";
function CategoriesPage() {
    const { flashcardsArray } = useFlashcardsContext();
    return (
        <div>
            <CreateCard />
            <div>cards</div>
            {JSON.stringify(flashcardsArray)}
        </div>
    );
}

export default CategoriesPage;
