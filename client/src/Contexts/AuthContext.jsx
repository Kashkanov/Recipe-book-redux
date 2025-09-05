import {createContext, useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [returnUrl, setReturnUrl] = useState("/");
    const backend_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        fetch(backend_url + "api/me", {
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setIsAuth(true);
                    setUser(data);
                    setLoading(false);
                });
            }
        }).catch((err) => {
            console.log(err);
            setIsAuth(false);
            setLoading(true);
        })
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
                setIsAuth(true);
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
                setIsAuth(false);
                setUser(null);
                setLoading(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const obj = useMemo(() => ({isAuth, setIsAuth, user, setUser, loading, setLoading, returnUrl, setReturnUrl, login, logout}), [isAuth, setIsAuth, user, setUser, loading, setLoading, returnUrl, setReturnUrl, login, logout]);

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