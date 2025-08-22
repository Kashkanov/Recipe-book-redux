import {NavLink} from "react-router";

const Navbar = () => {

    const links = [
        {
            name: "Home",
            link: "/"
        },

    ];

    return (
        <nav className="fixed flex justify-end items-center h-15 w-dvw bg-gray-300 py-auto px-5 z-50">
            <ul className="flex gap-5">
                {
                    links.map((item) => {
                        return (
                            <li key={item.name}>
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Navbar;