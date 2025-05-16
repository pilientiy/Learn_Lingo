import { useState } from "react";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import css from './AuthPromptModal.module.css';

export default function AuthPromptModal() {
  const [modalType, setModalType] = useState(null);

  return (
    <div className={css.wrapper}>
      {modalType ? (
        modalType === "login" ? (
          <Login setModalType={setModalType} />
        ) : (
          <Registration setModalType={setModalType} />
        )
      ) : (
        <>
          <h2 className={css.heading}>
            This functionality is available only to authorized users.
          </h2>
          <p className={css.text}>
           Please log in or register to add a teacher to your favorites.
          </p>
          <div className={css.buttonWrapper}>
            <button
              onClick={() => setModalType("login")}
              className={css.button}>
              Log in
            </button>
            <button
              onClick={() => setModalType("registration")}
              className={css.button}>
              Registration
            </button>
          </div>
        </>
      )}
    </div>
  );
}