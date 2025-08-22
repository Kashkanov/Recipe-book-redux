import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {motion} from "motion/react";

const RecipePage = () => {

    const [recipe, setRecipe] = useState({});

    useEffect(() => {

    }, []);

    return (
        <div className="relative w-full h-full bg-gradient-to-bl from-gray-900 to-fuchsia-950">
            {recipe && (
                <h1>
                    {recipe.title}
                </h1>
            )}

        </div>
    )
}

export default RecipePage
