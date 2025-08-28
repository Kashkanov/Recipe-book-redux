import RecipeTable from "../../Components/Recipes/RecipeTable.jsx";
import {useEffect, useState} from "react";

const Recipes = () => {

    const api_url = "http://localhost:5050/";

    const [recipes, setRecipes] = useState([]);

    async function getAllRecipes() {
        const response = await fetch(api_url + "recipes/");
        const data = await response.json();
        setRecipes(data);
    }

    useEffect(() => {
        getAllRecipes();
    }, []);

    return (
        <div
            className="relative flex-col justify-center items-center w-full h-full bg-gradient-to-bl bg-[#a3b18a]">
            <h1>Recipes</h1>
            <div className="relative h-dvh w-dvw flex justify-center mt-10">
                <div className="container">
                    {recipes && (
                        <div className="relative w-full flex justify-center">
                            <RecipeTable recipes={recipes}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Recipes;