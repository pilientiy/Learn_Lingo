import * as Yup from 'yup';

export const regiastrationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be no more than 30 characters')
    .required('Enter your name'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be no more than 30 characters')
    .required('Enter your password'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Enter your password'),
});
