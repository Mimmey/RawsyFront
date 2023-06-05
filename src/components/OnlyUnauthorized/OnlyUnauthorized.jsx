import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const OnlyUnauthorized = ({ children }) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    // if (user.isAuth) {
    //     requestIdleCallback(() => navigate('/profile'));
    //     return null;
    // }

    return children;
}