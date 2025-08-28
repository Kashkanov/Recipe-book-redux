import PropTypes from "prop-types";
import {motion} from "framer-motion";

const RecipeTable = ({recipes}) => {

    return (
        <div className="w-4/6 grid grid-cols-3 gap-4">
            {recipes &&
                recipes.map((recipe) => {
                    return (
                        <motion.div
                            key={recipe._id}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            variants={
                                {
                                    rest: {
                                        scaleX: [1, 0, 1],
                                        transition: { duration: 0.5, ease: "easeOut" }
                                    },
                                    hover: {
                                        scaleX: [1, 0, 1],
                                        transition: {duration: 0.5, ease: "easeOut"}
                                    }
                                }
                            }
                            className="relative flex flex-col w-full h-72 bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer mb-2 gap-2"
                        >
                            <img
                                src={recipe.picture}
                                alt={recipe.title}
                                className="max-h-3/4 w-full object-cover"
                            />
                            <p className="text-xl">{recipe.title}</p>
                            {/* Back part with details */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#58559A] p-5"
                                initial="rest"
                                whileHover="hover"
                                variants={
                                    {
                                        rest: {
                                            opacity: 0,
                                            transition: {delay: 0.2, duration: 0.1, ease: "linear"}
                                        },
                                        hover: {
                                            opacity: 1,
                                            transition: {delay: 0.2, duration: 0.1, ease: "linear"}
                                        }
                                    }
                            }
                            >
                                <p className="text-xl">{recipe.title}</p>
                                <p className="text-sm">{recipe.description}</p>
                            </motion.div>

                        </motion.div>
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
