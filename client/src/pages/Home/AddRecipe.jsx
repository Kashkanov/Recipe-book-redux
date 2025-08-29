import {useRef, useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddRecipe = () => {

    const [pic, setPic] = useState(null);
    const picRef = useRef(null);
    const picNameRef = useRef(null);
    const thumbnailRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPic(file);
        }
        thumbnailRef.current.src = URL.createObjectURL(file);
        picNameRef.current.value = file.name;
    };

    const handleFileRemove = () => {
        thumbnailRef.current.src = "/public/assets/placeholderPic.png"
        picNameRef.current.value = "";
    }

    return (
        <div
            className="relative flex flex-col justify-start items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">

            <div
                className="relative w-5/6 h-[33rem] flex flex-col items-start mt-20 text-[#344e41]">
                <h1>Add a Recipe</h1>
                <form className="flex flex-col w-full h-full pt-5 text-xl gap-y-3">
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
                                            id="prep_time"
                                            name="prep_time"
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
                                    className="w-full h-48 border-1 rounded-md bg-white p-1 resize-none"
                                />
                            </label>
                        </div>

                        {/* picture */}
                        <div className="flex flex-col items-center w-1/2 pl-5">
                            <label
                                className="flex flex-col w-full items-start gap-y-3"
                                htmlFor="image"
                            >
                                <strong>Image</strong>
                                <div className="relative flex justify-center w-full max-w-full h-80 bg-black overflow-hidden">
                                    <img
                                        className="object-cover"
                                        src="../../../public/assets/placeholderPic.png"
                                        ref={thumbnailRef}
                                        alt=""
                                    />
                                </div>
                                <div className="flex w-full justify-start items-center gap-1">
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
                                        className="w-7/12 border-1 rounded-md bg-white p-1"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="border bg-red-400 w-3/12 text-white h-full p-1 rounded-md"
                                        onClick={handleFileRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddRecipe;