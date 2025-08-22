import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import NavBar from "./Components/NavBar.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>

            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/Recipes" element={<Recipes/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
