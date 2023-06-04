import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export const OnlyAuthorized = ({ children }) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!user.isAuth) {
        requestIdleCallback(() => navigate('/login'));
        return null;
    }

    return children;
}