import {useAuth} from "../../Contexts/AuthContext.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
const Login = () => {

    const {login} = useAuth();
    const navigate = useNavigate();
    const [ searchParams] = useSearchParams();


    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        login(username, password);
        navigate(searchParams.get("returnUrl") || "/", {replace: true});
    }


    return (
        <div className="relative flex flex-col justify-center items-center w-screen h-dvh overflow-x-hidden">
            <img
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="loginBg"
                src="../../../public/assets/Login_bg.png"
            />
            <div className="relative flex w-full justify-end">
                <div className="w-1/2 flex justify-start p-5">
                    <div className="flex flex-col justify-center items-center w-1/2 h-100 bg-[#3a5a40] rounded-xl">
                        <form onSubmit={handleLogin} className="w-full">
                            <h2 className="mb-5 text-4xl"><strong>Login</strong></h2>
                            <label
                                htmlFor="username"
                                className="flex flex-col justify-start items-start w-full px-10 text-xl gap-y-2 mb-5"
                            >
                                <p>Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    className="bg-white w-full p-1 rounded-md text-lg text-black"
                                    placeholder="Username"
                                />
                            </label>

                            <label
                                htmlFor="password"
                                className="flex flex-col justify-start items-start w-full px-10 text-xl gap-y-2 mb-5"
                            >
                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-white w-full p-1 rounded-md text-black"
                                    placeholder="Password"
                                />
                            </label>
                            <button
                                type="submit"
                                className="w-25 text-white h-10 p-1 rounded-md text-lg bg-[#588157] hover:underline mb-5"
                            >
                                Login
                            </button>
                            <h3><a href="/register" className="text-white hover:underline">Create an Account</a></h3>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;