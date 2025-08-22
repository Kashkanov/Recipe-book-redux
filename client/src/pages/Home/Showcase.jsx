import {useEffect, useState} from "react";
import {motion} from "motion/react";
import {dummyRecipes} from "../../data/dummyRecipes.js";

const Showcase = () => {
    const api_url = "http://localhost:5050/";

    const [sampRecipes, setSampRecipes] = useState([]);
    const [newestRecipe, setNewestRecipe] = useState({});


    async function getThreeLatestRecipes() {
        const response = await fetch(api_url + "recipes/threeLatest/");
        const data = await response.json();
        setSampRecipes(data);
    }

    async function getLatestRecipe() {
        const response = await fetch(api_url + "recipes/latest/");
        const data = await response.json();
        setNewestRecipe(data);
    }

    useEffect(() => {
        getThreeLatestRecipes();
        getLatestRecipe()
    }, []);

    return (
        <>
            {sampRecipes.length > 0 &&
                (
                    <div className="relative w-5/6 h-5/6 flex">
                        <div className="w-1/2 h-full p-3">
                            <motion.div
                                className="relative w-full h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                                initial={{scale: 1}}
                                whileHover="hover"
                            >
                                <img
                                    src={newestRecipe.picture}
                                    alt={newestRecipe.title}
                                    className="w-full h-full object-cover"
                                />
                                {/*Overlay pull-down on hover*/}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#58559A] opacity-80"
                                    initial={{y: -600}}
                                    variants={{
                                        hover: {
                                            y: 0,
                                            transition: {type: "tween", duration: 0.5, ease: "easeOut"}
                                        },
                                    }}
                                >
                                    <div className="flex-col justify-center w-full h-44">
                                        <h1 className="text-5xl font-bold">{newestRecipe.title}</h1>
                                        <p className="pt-5 mx-5">{newestRecipe.description}</p>
                                        <div className="flex justify-center items-center w-full mt-5">
                                            <div className="flex-col w-1/2 justify-center">
                                                <p className="text-5xl">🔪</p>
                                                <h2 className="text-3xl"><strong>{newestRecipe.prep_time}</strong> mins</h2>
                                                <p>Prep Time</p>
                                            </div>
                                            <div className="flex-col w-1/2 justify-center">
                                                <p className="text-5xl">🍳</p>
                                                <h2 className="text-3xl"><strong>{newestRecipe.cook_time}</strong> mins</h2>
                                                <p>Cook Time</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="w-1/2 h-full flex gap-3">
                            <div className="relative w-full h-full flex flex-wrap">
                                {
                                    sampRecipes.map((recipe) => {
                                        return (
                                            <div
                                                key={recipe._id}
                                                className="w-1/2 h-1/2 p-3"
                                            >
                                                <motion.div
                                                    className="relative w-full h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                                                    initial={{scale: 1}}
                                                    whileHover="hover"
                                                >
                                                    <img
                                                        src={recipe.picture}
                                                        alt={recipe.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <motion.div
                                                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#58559A] opacity-80"
                                                        initial={{y: -600}}
                                                        variants={{
                                                            hover: {
                                                                y: 0,
                                                                transition: {type: "tween", duration: 0.5, ease: "easeOut"}
                                                            },
                                                        }}
                                                    >
                                                        <div className="flex-col justify-center w-full h-44">
                                                            <h2 className="text-2xl font-bold">{recipe.title}</h2>
                                                            <div className="flex justify-center items-center w-full mt-5">
                                                                <div className="flex-col w-1/2 justify-center">
                                                                    <p className="text-xl">🔪</p>
                                                                    <h2 className="text-lg"><strong>{recipe.prep_time}</strong> mins</h2>
                                                                    <p>Prep Time</p>
                                                                </div>
                                                                <div className="flex-col w-1/2 justify-center">
                                                                    <p className="text-xl">🍳</p>
                                                                    <h2 className="text-lg"><strong>{recipe.cook_time}</strong> mins</h2>
                                                                    <p>Cook Time</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 p-3">
                                    <motion.div
                                        className="flex flex-col justify-center items-center w-full h-full  rounded-xl shadow-lg cursor-pointer"
                                        initial={{backgroundColor: "#464646"}}
                                        whileHover={{
                                            backgroundColor: "#ffffff",
                                            color: "black",
                                        }}
                                        transition={{ duration: 2, ease: "easeOut"}}
                                    >
                                        <h2 className="text-lg">See more recipes</h2>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Showcase;