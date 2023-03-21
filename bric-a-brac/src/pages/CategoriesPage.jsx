import CreateCard from "../components/CreateCard";
import StartLearning from "../components/StartLearning";
import FlashcardsShowcase from "../components/FlashcardsShowcase";

function CategoriesPage() {
    return (
        <div className='grid gap-8'>
            <StartLearning />
            <CreateCard />
            <FlashcardsShowcase />
        </div>
    );
}

export default CategoriesPage;
