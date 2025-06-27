import {useState} from "react";

const Showcase = () => {

    const [recipes, setRecipes] = useState([]);
    const [numRecipes, setNumRecipes] = useState(0);
    const sampRecipes = ["recipe 1", "recipe 2", "recipe 3"];

    return (
        <div className="relative w-5/6 h-5/6 flex">
            <div className="w-1/2 h-full p-3">
                <div className="w-full h-full bg-gray-700 rounded-xl shadow-lg">
                    recipe 1
                </div>
            </div>
            <div className="w-1/2 h-full flex gap-3">
                <div className="relative w-full h-full flex flex-wrap">
                    {
                        sampRecipes.map((recipe) => {
                            return (
                                <div className="w-1/2 h-1/2 p-3">
                                    <div className="w-full h-full bg-gray-700 rounded-xl shadow-lg">
                                        {recipe}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 p-3">
                        <div className="w-full h-full bg-gray-700 rounded-xl shadow-lg">
                            See more ->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showcase;