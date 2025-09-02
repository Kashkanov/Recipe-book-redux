import {motion} from "framer-motion";
import PropTypes from "prop-types";

const Steps = ({steps}) => {

    return (
        <div className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 ">
            <h1 className="text-5xl font-bold pb-5">Instructions</h1>
            {steps &&
                (
                    <div className="flex flex-col w-full gap-y-10">
                        <ol className="list-decimal list-inside">
                            {steps.map((step, index) => {
                                return (
                                    <motion.li key={index}
                                               className="relative text-2xl items-center list-item py-5 px-2"
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
    )
}

export default Steps;
Steps.propTypes = {
    steps: PropTypes.array
}