import CategoriesPage from "./pages/CategoriesPage";
import FlashcardPage from "./pages/FlashcardPage";
import Route from "./components/Route";
function App() {
    return (
        <div>
            <Route path='/'>{() => <CategoriesPage />}</Route>
            <Route path='/flashcard/<id>'>{(id) => <FlashcardPage id={id} />}</Route>
        </div>
    );
}

export default App;
