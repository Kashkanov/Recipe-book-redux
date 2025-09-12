import RecipeTable from "../../Components/Recipes/RecipeTable.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";
import Pagination from "../../Components/Recipes/Pagination.jsx";
import { getAllRecipesAndCount } from "../../services/recipeService.js";

const Recipes = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [recipes, setRecipes] = useState([]);
    const [total, setTotal] = useState(0);
    const page = parseInt(searchParams.get("page")) || 1;

    async function AllRecipesAndCount() {
        const response = await getAllRecipesAndCount(page);
        setRecipes(response.recipes);
        setTotal(response.total);
    }

    function handlePageChange(newPage) {
        setSearchParams({page: newPage});
    }

    useEffect(() => {
        AllRecipesAndCount();
    }, [page]);

    return (
        <div className="relative flex-col justify-center items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">
            <h1>Recipes</h1>
            <div className="relative flex justify-center my-10 h-150">
                {recipes && (
                    <div className="relative w-full flex justify-center">
                        <RecipeTable recipes={recipes}/>
                    </div>
                )}
            </div>
            <div className="flex justify-end p-5 w-full bottom-0 right-0 bg-[#588157]">
                <Pagination total={total} setPage={handlePageChange} currPage={page}/>
            </div>
        </div>
    )
}

export default Recipes;