import RegistrationForm from "../RegistrationForm/RegistrationForm";
import css from './Registration.module.css';


export default function Registration() {
    return (
        <div className={css.wrapper}>
            <h2 className={css.heading}>Registration</h2>
            <p className={css.text}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information</p>
            <RegistrationForm />
        </div>
    )
}