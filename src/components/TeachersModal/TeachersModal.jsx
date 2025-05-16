import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from 'react-hot-toast';
import css from './TeachersModal.module.css';


export default function TeachersModal({ teacher }) {
    const onSubmit = () => {
        toast.success('Your data has been successfully sent! Wait for a response from us.');
    };
    
const FeedbackSchema = Yup.object().shape({
    reason: Yup.string().required("Please select a reason for learning English"),
    fullName: Yup.string().min(3, "Full name must be at least 3 characters").max(50, "Too long!").required("Full name cannot be empty!"),
    email: Yup.string().email("Invalid email format").required("Email cannot be empty!"),
    phone: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g., +1234567890)").required("Phone number cannot be empty!"),
});
    
const { register, handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(FeedbackSchema),
    defaultValues: {
      reason: "",
      fullName: "",
      email: "",
      phone: "",
    },
});

    return (
        <div className={css.modalBlock}>
            <div className={css.modalInfo}>
                <h2 className={css.heading}>Book trial lesson</h2>
                <p className={css.about}>
                    Our experienced tutor will assess your current language level,
                    discuss your learning goals, and tailor the lesson to your specific needs.
                </p>
                <div className={css.teacherInfo}>
                    <img src={teacher.avatar_url} alt={teacher.name} className={css.image} />
                    <div className={css.teacherDetails}>
                        <p className={css.text}>Your teacher</p>
                        <p className={css.name}>{teacher.name}</p>
                    </div>
                </div>
            </div>
            <div className={css.formWrp}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.radioGroup}>
                        <p className={css.radioLabel}>
                            What is your main reason for learning English?
                        </p>
                        <div className={css.options}>
                            <label className={css.radioOption}>
                                <input
                                    type="radio"
                                    value="Career and business"
                                    {...register("reason")}
                                />
                                    <span>Career and business</span>
                            </label>
                            <label className={css.radioOption}>
                                <input
                                    type="radio"
                                    value="Lesson for kids"
                                    {...register("reason")}
                                />
                                    <span>Lesson for kids</span>
                            </label>
                            <label className={css.radioOption}>
                                <input
                                    type="radio"
                                    value="Living abroad"
                                    {...register("reason")}
                                />
                                    <span>Living abroad</span>
                            </label>
                            <label className={css.radioOption}>
                                <input
                                    type="radio"
                                    value="Exams and coursework"
                                    {...register("reason")}
                                />
                                    <span>Exams and coursework</span>
                            </label>
                            <label className={css.radioOption}>
                                <input
                                    type="radio"
                                    value="Culture, travel or hobby"
                                    {...register("reason")}
                                />
                                    <span>Culture, travel or hobby</span>
                            </label>
                        </div>
                        {errors.reason && (
                            <p className={css.error}>{errors.reason.message}</p>
                        )}
                        </div>
                        <div className={css.inputsBlock}>
                            <div className={css.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    {...register("fullName")}
                                    className={css.input}
                                />
                                {errors.fullName && (
                                <p className={css.error}>{errors.fullName.message}</p>
                                )}
                            </div>
                            <div className={css.inputGroup}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                    className={css.input}
                                />
                                {errors.email && (
                                <p className={css.error}>{errors.email.message}</p>
                                )}
                            </div>
                            <div className={css.inputGroup}>
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    {...register("phone")}
                                    className={css.input}
                                />
                                {errors.phone && (
                                <p className={css.error}>{errors.phone.message}</p>
                                )}
                            </div>
                        </div>
                        <button type="submit" className={css.submitButton}>
                            Book
                        </button>
                </form>
            </div>
        </div>
    )
};