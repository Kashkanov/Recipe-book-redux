import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import NavBar from "./Components/NavBar.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";
import RecipePage from "./pages/RecipePage/RecipePage.jsx";
import AddRecipe from "./pages/Home/AddRecipe.jsx";
import {useState} from "react";
import Login from "./pages/auth/Login.jsx";

function App() {
    const [user, setUser] = useState({auth: false, name: ''});

    return (
        <BrowserRouter>
            {user.auth ?
                <>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="/Recipes" element={<Recipes/>}/>
                        <Route path="/Recipes/:id" element={<RecipePage/>}/>
                        <Route path="/Recipes/add" element={<AddRecipe/>}/>
                    </Routes>
                </>
                :
                <Login setUser={setUser}/>
            }
        </BrowserRouter>
    )
}

export default App
