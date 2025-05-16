import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import toast from 'react-hot-toast';
import sprite from '../../images/sprite/icons.svg';
import css from './UserMenu.module.css';


export default function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const location = useLocation();
   
    const handleLogout = async () => {
        try {
            await dispatch(logOutUser()).unwrap();
            if (location.pathname === "/favorites") {
                toast.error("You are logged out. The Favorites page is only available to registered users.");
                navigate("/favorites");
            }      
        } catch (error) {
           console.error("Logout failed:", error) 
       }
    };

    return (
        <div className={css.wrapper}>
            <p className={css.text}>Welcome, <span className={css.name}>{user?.displayName || "User"}</span></p>
            <button type="button" onClick={handleLogout} className={css.button}>
                <svg className={css.icon}>
                    <use xlinkHref={`${sprite}#${"icon-logout-icon"}`} />
                </svg>
            </button>
        </div>
    )
};