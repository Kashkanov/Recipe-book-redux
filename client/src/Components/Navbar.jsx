import {NavLink} from "react-router";

const Navbar = () => {

    const links = [
        {
            name: "Home",
            link: "/"
        },

    ];

    return (
        <nav className="fixed flex justify-end items-center h-15 w-dvw bg-[#344E41] py-auto px-5 z-30">
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