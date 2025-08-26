import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion} from "motion/react";

const RecipePage = () => {

    const api_url = "http://localhost:5050/";
    const [recipe, setRecipe] = useState({});
    const params = useParams();
    const [checkedItems, setCheckedItems] = useState([]);
    const [servings, setServings] = useState(1);

    const toggleCheck = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((item) => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

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
                                <div className="flex justify-between">
                                    <h1 className="text-5xl font-bold pb-5">Ingredients</h1>
                                    {/* Servings adjust */}
                                    <div className="relative flex items-center h-10 w-40 font-bold">
                                        <button
                                            onClick={() => setServings(servings - 1)}
                                            disabled={servings === 1}
                                            className="bg-white h-full w-1/6 rounded-tl-xl rounded-bl-xl border-3 border-black text-center"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="flex h-full w-4/6 text-center bg-white border-b-3 border-t-3"
                                            value={servings}
                                            onChange={(e) => setServings(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setServings(servings + 1)}
                                            className="bg-white h-full w-1/6 rounded-tr-xl rounded-br-xl border-3 border-black text-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {recipe.ingredients &&
                                    (
                                        <div className="w-1/2">
                                            {/*TODO: on check, cross out ingredient*/}
                                            {recipe.ingredients.map((ingredient, index) => {
                                                const isChecked = checkedItems.includes(index);
                                                return (
                                                    <div
                                                        key={index}
                                                        className="relative flex text-2xl items-center py-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`ingredient-${index}`}
                                                            value={index}
                                                            checked={isChecked}
                                                            onChange={() => toggleCheck(index)}
                                                        />
                                                        <div className="relative">
                                                            <label
                                                                htmlFor={`ingredient-${index}`}
                                                                className="ml-5"
                                                            >
                                                                {ingredient.quantity * servings} {ingredient.unit} {ingredient.name}
                                                                <motion.span
                                                                    initial={false}
                                                                    animate={{width: isChecked ? "100%" : "0%"}}
                                                                    transition={{duration: 0.3}}
                                                                    className="absolute left-5 top-1/2 h-[2px] bg-black"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                            {/*Instructions section*/}
                            <div className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 ">
                                <h1 className="text-5xl font-bold pb-5">Instructions</h1>
                                {recipe.steps &&
                                    (
                                        <div className="flex flex-col w-full gap-y-10">
                                            <ol className="list-decimal list-inside">
                                                {recipe.steps.map((step, index) => {
                                                    return (
                                                        <li key={index}
                                                            className="relative text-2xl items-center py-2 list-item mb-10w">
                                                            {step}
                                                        </li>
                                                    )
                                                })}
                                            </ol>
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
