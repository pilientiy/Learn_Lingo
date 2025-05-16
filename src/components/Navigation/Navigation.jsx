import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import clsx from 'clsx';
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
import css from './Navigation.module.css';


const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() { 
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div>
            <nav>
                <NavLink to='/' className={getLinkClass}>Home</NavLink>
                <NavLink to='/teachers' className={getLinkClass}>Teachers</NavLink>
                {isLoggedIn && (
                    <NavLink to="/favorites" className={getLinkClass}>
                        Favorites
                    </NavLink>
                )}
            </nav>
            <Suspense fallback={<Loader />}>
                <Outlet/>
            </Suspense>
        </div>
    )
};