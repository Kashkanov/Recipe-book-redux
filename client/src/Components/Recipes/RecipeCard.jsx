import PropTypes from "prop-types";
import {motion} from "framer-motion";

const RecipeCard = ({recipe}) => {

    /* TODO: Fix spamming flip animation */
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
                        transition: {duration: 0.5, ease: "easeOut"}
                    },
                    hover: {
                        scaleX: [1, 0, 1],
                        transition: {duration: 0.5, ease: "easeOut"}
                    }
                }
            }
            className="w-full h-72"
        >
            <motion.div
                className="relative w-full h-full flex flex-col bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer mb-2 gap-2"
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
                    <p className="text-xl pb-5">{recipe.title}</p>
                    <p className="text-sm">"<i>{recipe.description}</i>"</p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default RecipeCard
RecipeCard.propTypes = {
    recipe: PropTypes.object
}
