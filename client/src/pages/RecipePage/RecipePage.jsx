import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion, useScroll, useTransform} from "framer-motion";
import Overview from "../../Components/RecipePage/Overview.jsx";
import Ingredients from "../../Components/RecipePage/Ingredients.jsx";
import Steps from "../../Components/RecipePage/Steps.jsx";

const RecipePage = () => {

    const {scrollYProgress} = useScroll()

    const api_url = "http://localhost:5050/";
    const [recipe, setRecipe] = useState({});
    const params = useParams();
    const [showFullPic, setShowFullPic] = useState(false);


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
                                <Overview
                                    title={recipe.title}
                                    prep_time={recipe.prep_time}
                                    cook_time={recipe.cook_time}
                                    description={recipe.description}
                                    uploader={recipe.uploader}
                                />
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
                                        <button
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
                                        </button>
                                    )}
                                </motion.div>
                            </div>
                            {/*Ingredients section*/}
                            <Ingredients ingredients={recipe.ingredients}/>
                            {/*Instructions section*/}
                            <Steps steps={recipe.steps}/>
                        </div>
                    </div>
                )}
            </div>

        </motion.div>
    )
}

export default RecipePage
