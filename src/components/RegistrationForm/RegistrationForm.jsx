import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../redux/auth/operations";
import sprite from '../../images/sprite/icons.svg';
import css from './RegistrationForm.module.css';

 const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Name cannot be empty!"),
        email: Yup.string().min(5, "Too Short").max(50, "Too Long!").email("Invalid email format").required("Email cannot be empty!"),
        password: Yup.string().min(8, "Password is too short - should be 8 chars minimum!").max(50, "Too Long!").required("Password cannot be empty!"),
 });
    
export default function RegistrationForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(FeedbackSchema) });
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        dispatch(registerUser(data))
    };

    return (
         <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <label className={css.label}>
                <input type="text" {...register("name")} placeholder="Name" className={css.input} />
            </label>
            {errors.name && <span className={css.error}>{errors.name.message}</span>}
            <label className={css.label}>
                <input type="email" {...register("email")} placeholder="Email" className={css.input} />
            </label>
            {errors.email && <span className={css.error}>{errors.email.message}</span>}
            <label className={css.label}>
                <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                    placeholder="Password"
                    className={css.input}
                />
                    <svg onClick={() => setShowPassword((show) => !show)} className={css.icon}>
                        <use xlinkHref={`${sprite}#${"icon-eye-off"}`} />
                    </svg>
            </label>
            {errors.password && <span className={css.error}>{errors.password.message}</span>}
            
            <button type="submit" className={css.button}>Sign Up</button>     
        </form>
    )
}