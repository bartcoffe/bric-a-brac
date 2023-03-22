import { useEffect } from "react";
import CategoriesPage from "./pages/CategoriesPage";
import FlashcardPage from "./pages/FlashcardPage";
import Route from "./components/Route";
// import SessionPage from "./pages/SessionPage";
import FilteredSessionPage from "./pages/FilteredSessionPage";
function App() {
    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute(
            "class",
            " text-zinc-800 bg-zinc-800 max-w-4xl mx-auto my-8 font-custom"
        );
    }, []);

    return (
        <div className=''>
            <Route path='/'>{() => <CategoriesPage />}</Route>
            {/* <Route path='/session'>{() => <SessionPage />}</Route> */}
            <Route path='/filtered-session'>{() => <FilteredSessionPage />}</Route>
            <Route path='/flashcard/<id>'>{(id) => <FlashcardPage id={id} />}</Route>
        </div>
    );
}

export default App;
