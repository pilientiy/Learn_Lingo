import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import sprite from '../../images/sprite/icons.svg';
import css from './AuthNav.module.css';

export default function AuthNav() {
    const [modal, setModal] = useState(null);
        const openModal = (type) => setModal(type);
        const closeModal = () => setModal(null);
    
    return (
         <div className={css.wrapper}>
             <div className={css.loginWrapper}>
                <button onClick={() => openModal("login")} className={css.loginButton}>
                    Log in
                    <svg className={css.icon} >
                        <use xlinkHref={`${sprite}#${"icon-login-1"}`} />
                    </svg>     
                </button>       
                <button onClick={() => openModal("registration")} className={css.registerButton}>
                    Registration
                </button>
            </div>
                <ModalWindow isOpen={!!modal} onClose={closeModal}>
                    {modal === 'login' && <Login />}
                    {modal === 'registration' && <Registration/>}
                </ModalWindow>
            </div>
        )
};