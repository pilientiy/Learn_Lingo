import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import ModalWindow from "../ModalWindow/ModalWindow";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import css from './PrivateRoute.module.css';


export default function PrivateRoute({ component }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [modal, setModal] = useState(null);
    const openModal = (type) => setModal(type);
    const closeModal = () => setModal(null);
 
  return isLoggedIn ? (
    component
  ) : (
    <div>
      <div className={css.wrapper}>
        <p className={css.text}>This page is available only to authorized users.</p>
        <p className={css.text}>
          Please
          <span className={css.buttonWrapper}>
            <button
              onClick={() => openModal("login")}
              className={css.button}>
              Log In
            </button>
          </span>
          or
          <span className={css.buttonWrapper}>
            <button
              onClick={() => openModal("registration")}
              className={css.button}>
              Sign Up
            </button>
          </span>
        </p>
      </div>
      <ModalWindow isOpen={!!modal} onClose={closeModal}>
        {modal === "login" && <Login />}
        {modal === "registration" && <Registration />}
      </ModalWindow>
    </div>
  );
}