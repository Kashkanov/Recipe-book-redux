import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import NavBar from "./Components/NavBar.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";
import RecipePage from "./pages/RecipePage/RecipePage.jsx";
import AddRecipe from "./pages/Home/AddRecipe.jsx";
import {useEffect} from "react";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import {useAuth} from "./Contexts/AuthContext.jsx";
import AuthWrapper from "./Wrappers/AuthWrapper.jsx";

function App() {
    const {isAuth} = useAuth();

    useEffect(() => {
        console.log("isAuthMain: ", isAuth);        //<===
    }, [isAuth]);

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<AuthWrapper><Homepage/></AuthWrapper>}/>
                <Route path="/Recipes" element={<AuthWrapper><Recipes/></AuthWrapper>}/>
                <Route path="/Recipes/:id" element={<AuthWrapper><RecipePage/></AuthWrapper>}/>
                <Route path="/Recipes/add" element={<AuthWrapper><AddRecipe/></AuthWrapper>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App
