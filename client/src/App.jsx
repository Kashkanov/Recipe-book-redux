import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import NavBar from "./Components/NavBar.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";
import RecipePage from "./pages/RecipePage/RecipePage.jsx";
import AddRecipe from "./pages/Home/AddRecipe.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import {AuthProvider, useAuth} from "./Contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

function AuthWrapper({children}) {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/login"/>
    }
    console.log("authenticated user is: ", user.username);         //<===
    return children;

}
AuthWrapper.propTypes = {
    children: PropTypes.node
}

function ReverseAuthWrapper({children}) {
    const {user} = useAuth();
    if (user) {
        return <Navigate to="/"/>
    }
    return children;
}
ReverseAuthWrapper.propTypes = {
    children: PropTypes.node
}

function App() {


    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<AuthWrapper><Homepage/></AuthWrapper>}/>
                    <Route path="/Recipes" element={<AuthWrapper><Recipes/></AuthWrapper>}/>
                    <Route path="/Recipes/:id" element={<AuthWrapper><RecipePage/></AuthWrapper>}/>
                    <Route path="/Recipes/add" element={<AuthWrapper><AddRecipe/></AuthWrapper>}/>

                    <Route path="/login" element={<ReverseAuthWrapper><Login/></ReverseAuthWrapper>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
