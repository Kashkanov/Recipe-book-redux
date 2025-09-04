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
import {useSelector} from "react-redux";

function App() {
    //const [user, setUser] = useState({auth: false, name: ''});
    const activeUser = useSelector(state => state.activeUser);

    useEffect(() => {
        console.log("user: ",activeUser);
    }, []);

    return (
        <BrowserRouter>
            {activeUser.auth ?
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
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            }
        </BrowserRouter>
    )
}

export default App
