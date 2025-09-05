import {useEffect, useRef, useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddIngredients from "../../Components/AddRecipe/AddIngredients.jsx";
import AddSteps from "../../Components/AddRecipe/AddSteps.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext.jsx";

const AddRecipe = () => {

    const navigate = useNavigate();
    const api_url = "http://localhost:5050/";
    const [title, setTitle] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const picRef = useRef(null);
    const picNameRef = useRef(null);
    const thumbnailRef = useRef(null);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientCount, setIngredientCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const { user } = useAuth();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
        }
        thumbnailRef.current.src = URL.createObjectURL(file);
        picNameRef.current.value = file.name;
        console.log(file.name)
    };

    const handleFileRemove = () => {
        thumbnailRef.current.src = "/public/assets/placeholderPic.png"
        picNameRef.current.value = "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // send to api
        const picFormData = new FormData();
        let picPath = "";

        if(picture){
            picFormData.append("picture", picture);
            const response = await fetch(api_url + "recipes/uploadImage", {
                method: "POST",
                body: picFormData
            })

            const data = await response.json();
            picPath = data.url;
            console.log(picPath);
        }
        postRecipe(picPath);
    }

    async function postRecipe(picPath) {
        const response = await fetch(api_url + "recipes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                prep_time: prepTime,
                cook_time: cookTime,
                description: description,
                picture: picPath,
                ingredients: ingredients,
                steps: steps,
                uploader: user._id,
            }),

        });

        if (response.ok) {
            const newRecipe = await response.json();
            navigate(`/recipes/${newRecipe._id}`);
        }
    }

    useEffect(() => {
        console.log(steps)
    }, [steps]);

    return (
        <div
            className="relative flex flex-col justify-start items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">
            <div className="relative w-4/6 h-[33rem] flex flex-col items-start m-20 text-[#344e41]">
                <h1><strong>Create Recipe</strong></h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-full h-[30rem] pt-5 text-xl gap-y-3">
                    {/* title, prep_time, cook_time, description, picture */}
                    <div className="flex w-full h-full bg-yellow-100 rounded-xl p-5">
                        {/* title, prep_time, cook_time, description */}
                        <div className="flex flex-col w-1/2 h-full gap-y-3 pr-5">
                            {/* title */}
                            <label
                                className="flex flex-col items-start p-2"
                                htmlFor="title"
                            >
                                <strong>Title</strong>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    autoComplete="on"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border-1 rounded-md bg-white p-1"
                                />
                            </label>
                            {/* prep_time, cook_time */}
                            <div className="flex w-full items-start p-2">
                                {/* prep_time */}
                                <label
                                    className="flex flex-col items-start"
                                    htmlFor="prep_time"
                                >
                                    <strong>Prep Time </strong>
                                    <div className="flex justify-start items-center">
                                        <input
                                            type="number"
                                            id="prep_time"
                                            name="prep_time"
                                            autoComplete="on"
                                            onChange={(e) => setPrepTime(parseInt(e.target.value))}
                                            className="w-1/4 border-1 rounded-md bg-white p-1"
                                        /> &nbsp; mins
                                    </div>
                                </label>
                                {/* cook_time */}
                                <label
                                    className="flex flex-col items-start"
                                    htmlFor="prep_time"
                                >
                                    <strong>Cook Time</strong>
                                    <div className="flex justify-start items-center">
                                        <input
                                            type="number"
                                            id="cook_time"
                                            name="cook_time"
                                            autoComplete="on"
                                            onChange={(e) => setCookTime(parseInt(e.target.value))}
                                            className="w-1/4 border-1 rounded-md bg-white p-1"
                                        /> &nbsp; mins
                                    </div>
                                </label>

                            </div>
                            {/* description */}
                            <label
                                className="flex flex-col items-start p-2 h-full"
                                htmlFor="description"
                            >
                                <strong>Description</strong>
                                <textarea
                                    id="description"
                                    name="description"
                                    autoComplete="on"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-48 border-1 rounded-md bg-white p-1 resize-none"
                                />
                            </label>
                        </div>

                        {/* picture */}
                        <div className="flex flex-col items-center w-1/2 h-full pl-5">
                            <label
                                className="flex flex-col w-full h-full items-start"
                                htmlFor="image"
                            >
                                <strong>Image</strong>
                                <div
                                    className="relative flex justify-center w-full max-w-full h-full max-h-full bg-black overflow-hidden mb-5">
                                    <img
                                        className="object-cover"
                                        src="../../../public/assets/placeholderPic.png"
                                        ref={thumbnailRef}
                                        alt=""
                                    />
                                </div>
                                <div className="flex w-full h-1/6 justify-start items-center gap-1">
                                    <button
                                        type="button"
                                        className="border bg-blue-400 w-3/12 text-white h-full p-1 rounded-md"
                                        onClick={() => picRef.current.click()}
                                    >
                                        Upload
                                    </button>
                                    <input
                                        type="file"
                                        id="pic"
                                        accept="image/*"
                                        ref={picRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <input
                                        type="text"
                                        id="picture"
                                        ref={picNameRef}
                                        name="picture"
                                        className="w-7/12 h-full border-1 rounded-md bg-white p-1"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="border bg-red-400 w-3/12 text-white h-full p-1 rounded-md"
                                        onClick={handleFileRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>
                    <AddIngredients
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        ingredientCount={ingredientCount}
                        setIngredientCount={setIngredientCount}
                    />
                    <AddSteps
                        steps={steps}
                        setSteps={setSteps}
                        stepCount={stepCount}
                        setStepCount={setStepCount}
                    />
                    <div className="relative flex justify-end w-full bg-yellow-100 rounded-xl px-10 py-2 gap-5 mb-10">
                        <button
                            type="button"
                            className="w-1/6 text-black h-15 p-1 rounded-md text-lg hover:underline"
                            // onClick={handleCreateRecipe}
                        >
                            &lt; Back
                        </button>
                        <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 w-1/6 text-white text-2xl h-full p-1 rounded-md"
                            // onClick={handleCreateRecipe}
                        >
                            <b>Create</b>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddRecipe;