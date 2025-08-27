import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion, useScroll, useTransform} from "framer-motion";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

const RecipePage = () => {

    const {scrollYProgress} = useScroll()

    const api_url = "http://localhost:5050/";
    const [recipe, setRecipe] = useState({});
    const params = useParams();
    const [checkedItems, setCheckedItems] = useState([]);
    const [servings, setServings] = useState(1);
    const [showFullPic, setShowFullPic] = useState(false);

    // Function to toggle the checked state of an item from the list
    const toggleCheck = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((item) => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };


    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 1],
        ["#4a044e", "#111827"]
    );

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
        console.log(backgroundColor)
    }, [scrollYProgress]);


    useEffect(() => {
        getRecipe();
    }, []);

    return (
        <motion.div
            className="relative h-full w-full bg-[#A3B18A]"
        >
            <div
                className="relative flex justify-center items-center p-5 overflow-y-visible"
            >
                {recipe && (
                    <div className="w-5/6 pt-16">
                        <div className="flex flex-col justify-center w-full gap-3">
                            {/*Overview and pic section*/}
                            <div className="flex justify-center w-full gap-3 max-h-110">
                                {/*Overview section*/}
                                <motion.div
                                    initial={{opacity: 0, x: -100}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{duration: 0.5}}
                                    className="flex-col w-1/3 text-start bg-yellow-100 rounded-lg text-black p-5"
                                >
                                    <h1 className="text-5xl font-bold pb-5">{recipe.title}</h1>
                                    <h2 className="text-2xl pb-2"><strong>Prep
                                        Time</strong>: {recipe.prep_time} mins.</h2>
                                    <h2 className="text-2xl pb-5"><strong>Cook
                                        Time</strong>: {recipe.cook_time} mins.</h2>
                                    <h3 className="text-xl pb-5">"<i>{recipe.description}</i>"</h3>
                                    <h3 className="text-xl">by: <u>{recipe.uploader}</u></h3>
                                </motion.div>
                                {/*Pic section*/}
                                <motion.div
                                    initial={{opacity: 0, x: 100}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: 0.3, duration: 0.5}}
                                    className="flex-col w-2/3 justify-center bg-yellow-100 rounded-lg overflow-hidden"
                                >
                                    <button
                                        className="relative w-full h-full bg-blue-400 overflow-hidden"
                                        onClick={() => setShowFullPic(true)}
                                    >
                                        <img
                                            src={recipe.picture}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                    {/* Full pic modal*/}
                                    {showFullPic && (
                                        <div
                                            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-40"
                                            onClick={() => setShowFullPic(false)}
                                        >
                                            <div
                                                className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 z-50">
                                                <img
                                                    src={recipe.picture}
                                                    alt={recipe.title}
                                                    className="max-w-full max-h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                            {/*Ingredients section*/}
                            <motion.div
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5, duration: 0.5}}
                                className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 "
                            >
                                <div className="flex justify-between">
                                    <h1 className="text-5xl font-bold pb-5">Ingredients</h1>
                                    {/* Servings adjust */}
                                    <div className="relative flex items-center h-10 w-40 font-bold">
                                        <button
                                            onClick={() => setServings(servings - 1)}
                                            disabled={servings === 1}
                                            className="relative bg-white h-full w-1/6 rounded-tl-xl rounded-bl-xl border-3 border-black flex justify-center items-center"
                                        >
                                            <FontAwesomeIcon icon={faMinus}/>
                                        </button>
                                        <input
                                            type="number"
                                            className="flex h-full w-3/6 text-center bg-white border-b-3 border-t-3"
                                            value={servings}
                                            onChange={(e) => setServings(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setServings(servings + 1)}
                                            className="relative bg-white h-full w-1/6 rounded-tr-xl rounded-br-xl border-3 border-black flex justify-center items-center"
                                        >
                                            <FontAwesomeIcon icon={faPlus}/>
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
                            </motion.div>
                            {/*Instructions section*/}
                            <div className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 ">
                                <h1 className="text-5xl font-bold pb-5">Instructions</h1>
                                {recipe.steps &&
                                    (
                                        <div className="flex flex-col w-full gap-y-10">
                                            <ol className="list-decimal list-inside">
                                                {recipe.steps.map((step, index) => {
                                                    return (
                                                        <motion.li key={index}
                                                                   className="relative text-2xl items-center py-2 list-item py-5 px-2"
                                                                   initial={{scale: 1}}
                                                                   whileHover={{
                                                                       scale: 1.1,
                                                                       background: "white",
                                                                       fontWeight: "bold"
                                                                   }}
                                                                   transition={{duration: 0.3}}
                                                        >
                                                            {step}
                                                        </motion.li>
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

        </motion.div>
    )
}

export default RecipePage
