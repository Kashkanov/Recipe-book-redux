import {useAuth} from "../Contexts/AuthContext.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const AuthWrapper = ({children}) => {
    const {isAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if(!isAuth) {
        const returnUrl = location.pathname;
        return navigate("/login?returnUrl=" + returnUrl, {replace: true});
    }

    return <>{children}</>;

};
export default AuthWrapper;
AuthWrapper.propTypes = {
    children: PropTypes.node
}