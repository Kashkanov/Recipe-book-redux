import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import NavBar from "./Components/NavBar.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";
import RecipePage from "./pages/RecipePage/RecipePage.jsx";

function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/Recipes" element={<Recipes/>}/>
                <Route path="/Recipe/:id" element={<RecipePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
