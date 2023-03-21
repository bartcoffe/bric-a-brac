import CreateCard from "../components/CreateCard";
import StartLearning from "../components/StartLearning";
import FlashcardsShowcase from "../components/FlashcardsShowcase";
import YourLearning from "../components/YourLearning";

function CategoriesPage() {
    return (
        <div className='grid gap-4'>
            <YourLearning />
            <div className='flex justify-between gap-4'>
                <StartLearning />
                <CreateCard />
            </div>
            <FlashcardsShowcase />
        </div>
    );
}

export default CategoriesPage;
