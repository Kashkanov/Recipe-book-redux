import {useRef} from "react";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const AddIngredients = ({ingredients, setIngredients, ingredientCount, setIngredientCount}) => {
    const newIngredientRef = useRef(null);

    const handleAddIngredient = (qty, unit, name) => {
        const newIngredient = {
            name: name,
            quantity: qty,
            unit: unit
        };
        setIngredients([...ingredients, newIngredient]);
        setIngredientCount(ingredientCount + 1);
        clearInputs();
    };

    const clearInputs = () => {
        const inputs = newIngredientRef.current.querySelectorAll("input");
        inputs.forEach((input) => (input.value = "")); // clears values
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }


    return (
        <div className="flex flex-col w-full bg-yellow-100 rounded-xl p-5">
            <div className="flex justify-start m-5">
                <h2 className="text-4xl"><b>Add Ingredients</b></h2>
            </div>
            <div className="flex flex-col w-full px-5">
                {/* Existing ingredients */}
                {ingredients.map((ingredient, index) => (
                    <div key={index}
                         className="flex items-center w-full h-25 bg-[#588157] text-white rounded-lg p-10 mb-5 text-xl">
                        <div className="flex justify-start w-1/6">{ingredient.quantity}</div>
                        <div className="flex justify-start w-1/6">{ingredient.unit}</div>
                        <div className="flex justify-start w-3/6">{ingredient.name}</div>
                        <div className="flex justify-end w-1/6">
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRemoveIngredient(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                {/* Add new ingredient */}
                <div
                    className="flex flex-col items-center justify-center w-full h-50 bg-[#dad7cd] text-[#344e41] border-5 border-[#588157] rounded-lg mb-5 text-xl">
                    <div ref={newIngredientRef} className="relative flex w-full h-4/6">
                        <div className="flex justify-center w-2/12 ">
                            <label
                                htmlFor={`quantity-${ingredientCount}`}
                                className="flex flex-col justify-center items-center gap-y-2"
                            >
                                <p>Quantity</p>
                                <input
                                    id={`quantity-${ingredientCount}`}
                                    className="w-20 h-10 text-black bg-white rounded-md text-xl px-3 border border-[#344e41]"
                                />
                            </label>
                        </div>
                        <div className="flex justify-center w-4/12 ">
                            <label
                                htmlFor={`unit-${ingredientCount}`}
                                className="flex flex-col justify-center items-center gap-y-2 "
                            >
                                <p>Unit</p>
                                <input
                                    id={`unit-${ingredientCount}`}
                                    className="w-40 h-10 text-black bg-white rounded-md text-xl px-3 border border-[#344e41]"
                                />
                            </label>
                        </div>
                        <div className="flex justify-center w-6/12 ">
                            <label
                                htmlFor={`name-${ingredientCount}`}
                                className="flex flex-col justify-center items-center gap-y-2 "
                            >
                                <p>Name</p>
                                <input
                                    id={`name-${ingredientCount}`}
                                    className="w-100 h-10 text-black bg-white rounded-md text-xl px-3 border border-[#344e41]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-2/6">
                        <button
                            type="button"
                            className="bg-[#344e41] hover:bg-[#588157] text-white h-10 text-[18px] px-4 rounded"
                            onClick={() => {
                                handleAddIngredient(
                                    document.getElementById(`quantity-${ingredientCount}`).value,
                                    document.getElementById(`unit-${ingredientCount}`).value,
                                    document.getElementById(`name-${ingredientCount}`).value
                                );
                            }}
                        >
                            Add Ingredient <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddIngredients;
AddIngredients.propTypes = {
    ingredients: PropTypes.array,
    setIngredients: PropTypes.func,
    ingredientCount: PropTypes.number,
    setIngredientCount: PropTypes.func
}