import {dummyRecipes} from "../../data/dummyRecipes.js";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

const Recipes = () => {
    DataTable.use(DT);
    const columns = [
        {title: "Picture", field: "picture", formatter: "image"},
        {title: "Title", field: "title"},
        {title: "Prep Time", field: "prepTime"},
        {title: "Cook Time", field: "cookTime"},
    ];
    return (
        <div
            className="relative flex-col justify-center items-center w-full h-full bg-gradient-to-bl from-gray-900 to-fuchsia-950 pt-20">
            <h1>Recipes</h1>
            <div className="relative h-dvh w-dvw flex justify-center items-center">
                <div className="container">
                    <DataTable
                        className="display w-10"
                        columns={columns}
                        layout="fitColumns"
                        striped
                    >
                        <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Title</th>
                            <th>Prep Time</th>
                            <th>Cook Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dummyRecipes.map((recipe) => {
                            return (
                                <tr>
                                    <td className="flex items-center justify-center">
                                        <img
                                            src={recipe.picture}
                                            alt={recipe.title}
                                            className="h-20 w-20 m-1"
                                        />
                                    </td>
                                    <td>{recipe.title}</td>
                                    <td>{recipe.prep_time}</td>
                                    <td>{recipe.cook_time}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Recipes;