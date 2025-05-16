import LoginForm from '../LoginForm/LoginForm';
import css from './Login.module.css';

export default function Login() {
    return (
        <div className={css.wrapper}>
            <h2 className={css.heading}>Log In</h2>
            <p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>
            <LoginForm />
        </div>
    )
}