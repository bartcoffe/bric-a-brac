import { useEffect } from "react";
import CategoriesPage from "./pages/CategoriesPage";
import FlashcardPage from "./pages/FlashcardPage";
import Route from "./components/Route";
function App() {
    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("class", "bg-indigo-200 max-w-4xl mx-auto my-4 font-custom");
    }, []);

    return (
        <div className=''>
            <Route path='/'>{() => <CategoriesPage />}</Route>
            <Route path='/flashcard/<id>'>{(id) => <FlashcardPage id={id} />}</Route>
        </div>
    );
}

export default App;
