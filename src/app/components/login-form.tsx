'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './button';
import MiniLoader from './mini-loader';
import toast from 'react-hot-toast';
import { handleLoginError } from '../../../utils/handleLoginError';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../schemas/schemas';
import { handleCloseModal } from '../../../utils/modalHelpers';
import { useStateContext } from './state-provider';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

interface FormValues {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { setIsOpenLog } = useStateContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginSchema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async (data: LoginData) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        switch (response.status) {
          case 400:
          case 401:
            toast.error('Session expired. Please log in again');
            break;

          case 403:
            toast.error('This account has been deactivated.');
            break;

          case 404:
            toast.error('User not found. Please log in again');
            break;

          default:
            toast.error('Log in failed. Try again');
        }
        return;
      }

      toast.success('Login successful');
      handleCloseModal(setIsOpenLog)();
      router.push('/teachers');
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleLoginError(error);
      } else {
        toast.error('Login error. Please try again later!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="input h-[54px] mb-[18px]"
          {...register('email')}
        />
        <p className="absolute top-1 left-3 text-xs text-red">
          {errors.email?.message}
        </p>
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="input h-[54px] mb-10"
          {...register('password')}
        />
        <p className="absolute top-1 left-3 text-xs text-red">
          {errors.password?.message}
        </p>
        <Button
          onClick={handleShowPassword}
          type="button"
          className="absolute top-4 right-5 stroke-text-color-muted fill-none eye-hover"
        >
          <svg width={20} height={20}>
            <use href="/icons/icons.svg#icon-eye"></use>
          </svg>
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full py-4 min-h-[60px] rounded-xl mx-auto bg-red font-bold text-lg leading-normal red-button-hover mb-5"
      >
        {loading ? <MiniLoader /> : <p>Log In</p>}
      </Button>
    </form>
  );
}
