import {NavLink} from "react-router";

const Navbar = () => {

    const links = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Explore",
            link: "/Recipes?page=1"
        },
        {
            name: "Create",
            link: "/Recipes/add"
        }
    ];

    return (
        <nav className="fixed flex justify-start items-center h-15 w-dvw bg-[#344E41] py-auto px-10 z-30">
            <ul className="flex gap-5">
                {
                    links.map((item) => {
                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.link}
                                    className="font-bold"
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Navbar;