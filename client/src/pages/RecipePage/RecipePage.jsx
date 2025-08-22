import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion} from "motion/react";

const RecipePage = () => {

    const api_url = "http://localhost:5050/";
    const [recipe, setRecipe] = useState({});
    const params = useParams();

    async function getRecipe() {
        const id = params.id?.toString() || undefined;
        const response = await fetch(api_url + "recipes/" + id);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setRecipe(data);
        }
    }

    useEffect(() => {
        getRecipe();
    }, []);

    return (
        <div className="relative h-full w-full bg-gradient-to-bl from-gray-900 to-fuchsia-950">
            <div className="relative w-dvw flex justify-center items-center p-5 overflow-y-visible">
                {recipe && (
                    <div className="w-5/6 pt-16">
                        <div className="flex flex-col justify-center w-full gap-3">
                            {/*Overview and pic section*/}
                            <div className="flex justify-center w-full gap-3 max-h-100">
                                {/*Overview section*/}
                                <div className="flex-col w-1/3 text-start bg-yellow-100 rounded-lg text-black p-5">
                                    <h1 className="text-5xl font-bold pb-5">{recipe.title}</h1>
                                    <h2 className="text-2xl pb-2"><strong>Prep
                                        Time</strong>: {recipe.prep_time} mins.</h2>
                                    <h2 className="text-2xl pb-5"><strong>Cook
                                        Time</strong>: {recipe.cook_time} mins.</h2>
                                    <h3 className="text-xl">"<i>{recipe.description}</i>"</h3>
                                </div>
                                {/*Pic section*/}
                                <div
                                    className="flex-col w-2/3 justify-center bg-yellow-100 rounded-lg overflow-hidden">
                                    <img
                                        src={recipe.picture}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/*Ingredients section*/}
                            <div className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 ">
                                <h1 className="text-5xl font-bold pb-5">Ingredients</h1>

                                {recipe.ingredients &&
                                    (
                                        <div className="w-1/2">
                                            {/*TODO: on check, cross out ingredient*/}
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <div
                                                    key={index}
                                                    className="relative flex text-2xl items-center py-2"
                                                >
                                                    <input type="checkbox" id={index} value={index}/>
                                                    <label
                                                        htmlFor={index}
                                                        className="ml-5"
                                                    >
                                                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                                    </label>
                                                    <hr className="absolute w-full left-7 border-2"/>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecipePage
