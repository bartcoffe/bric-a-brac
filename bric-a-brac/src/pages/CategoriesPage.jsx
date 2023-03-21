import CreateCard from "../components/CreateCard";
import TestYourself from "../components/TestYourself";
import FlashcardsShowcase from "../components/FlashcardsShowcase";
import YourLearning from "../components/YourLearning";
import Panel from "../components/Panel";

function CategoriesPage() {
    return (
        <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
                <TestYourself />
                <YourLearning />
            </div>
            <Panel>
                <CreateCard />
            </Panel>
            <Panel>
                <FlashcardsShowcase />
            </Panel>
        </div>
    );
}

export default CategoriesPage;
