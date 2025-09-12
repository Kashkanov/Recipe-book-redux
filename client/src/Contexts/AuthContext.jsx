import {createContext, useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [returnUrl, setReturnUrl] = useState("/");
    const backend_url = import.meta.env.VITE_API_URL;

    const checkAuth = async () => {

        try {
            const response = await fetch(backend_url + "api/me", {
                credentials: "include",
            });

            const data = await response.json();
            console.log("data: ", data);     //<===
            if (data) {
                setUser(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
            setLoading(false);
        }
        finally {
            setLoading(false)
        }
    }


    const login = (username, password) => {
        fetch(backend_url + "api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({username, password}),
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);

                console.log("user logged in: ", data);      //<===
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const logout = () => {
        fetch(backend_url + "api/logout", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                setUser(null);
                setLoading(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const obj = useMemo(() => ({
        user,
        setUser,
        checkAuth,
        returnUrl,
        setReturnUrl,
        login,
        logout
    }), [user, setUser, checkAuth, returnUrl, setReturnUrl, login, logout]);

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node
}