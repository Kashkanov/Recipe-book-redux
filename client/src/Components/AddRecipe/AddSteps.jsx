import {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import PropTypes from "prop-types";


const AddSteps = ({steps, setSteps, stepCount, setStepCount, isInstructionsValid}) => {

    const newStepRef = useRef(null);

    const handleAddStep = (step) => {
        if (step.trim() !== "") {
            setSteps([...steps, step]);
            setStepCount(stepCount + 1);
            clearInputs();
        }
    };

    const clearInputs = () => {
        const inputs = newStepRef.current.querySelectorAll("textarea");
        inputs.forEach((input) => (input.value = "")); // clears values
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    return (
        <div className="flex flex-col w-full bg-yellow-100 rounded-xl p-5">
            <div className="flex justify-start m-5">
                <h2 className="text-4xl"><b>Add Steps</b></h2>
            </div>
            <div className="relative flex flex-col w-full px-5 list-decimal">
                {/* Existing steps */}
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex items-center w-full h-25 bg-[#588157] text-white rounded-lg p-10 mb-5 text-xl"
                    >
                        <li className="flex justify-start w-5/6">{index + 1}. {step}</li>
                        <div className="flex justify-end w-1/6">
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRemoveStep(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                {/* Add new step */}
                <div
                    className="flex flex-col items-center justify-center w-full h-60 bg-[#dad7cd] text-[#344e41] border-5 border-[#588157] rounded-lg mb-5 text-xl"
                >
                    <div ref={newStepRef} className="relative flex w-full h-4/6">
                        <div className="flex justify-center w-full mx-5">
                            <label
                                htmlFor={`step-${stepCount}`}
                                className="flex flex-col justify-center w-full items-center gap-y-2 "
                            >
                                <p className="text-2xl">Step</p>
                                <textarea
                                    id={`step-${stepCount}`}
                                    className="w-full h-30 text-black bg-white rounded-md text-lg px-3 border border-[#344e41] resize-none"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-2/6">
                        <button
                            type="button"
                            className="bg-[#344e41] hover:bg-[#588157] text-white h-10 text-[18px] px-4 rounded"
                            onClick={() => {
                                handleAddStep(
                                    document.getElementById(`step-${stepCount}`).value
                                );
                                setStepCount(stepCount + 1);
                            }}
                        >
                            Add Step <FontAwesomeIcon icon={faCirclePlus}/>
                        </button>
                    </div>
                </div>
                {!isInstructionsValid &&
                    <span className="absolute text-red-600 bottom-[-0.5rem]">Please add at least one step</span>
                }
            </div>
        </div>
    )
}

export default AddSteps
AddSteps.propTypes = {
    steps: PropTypes.array,
    setSteps: PropTypes.func,
    stepCount: PropTypes.number,
    setStepCount: PropTypes.func,
    isInstructionsValid: PropTypes.bool
}