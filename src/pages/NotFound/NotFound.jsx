import { NavLink } from "react-router-dom";
import css from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={css.wrapper}>
            <p className={css.message}>Sorry, this page not found!</p>
            <p className={css.message}> Please, go to{" "}
                <NavLink to="/" className={css.link}>
                    Home Page
                </NavLink>
            </p>
        </div>
    )
};

