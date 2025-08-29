import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard.jsx";

const RecipeTable = ({recipes}) => {

    return (
        <div className="w-4/6 grid grid-cols-3 gap-4">
            {recipes.map((recipe) => {
                    return (
                        <RecipeCard key={recipe._id} recipe={recipe}/>
                    )
                })
            }
        </div>
    )
}

export default RecipeTable;
RecipeTable.propTypes = {
    recipes: PropTypes.array
}
