import { apiRegisterUser } from '@/apis';
import { ApiResponse } from '@/models/apiResponse';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Register() {
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  async function handleSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      valid = false;
      if (email == '') {
        setEmailErrorMessage('Email is required.');
      } else {
        setEmailErrorMessage('Must be a valid email.');
      }
    }

    if (password == '') {
      valid = false;
      setPasswordErrorMessage('Password is required.');
    }

    if (valid) {
      setIsSubmitting(true);
      try {
        const response = await apiRegisterUser({ email, password });
        toast(response.message, {
          type: 'success',
        });
      } catch (error) {
        const response = (error as AxiosError)!.response?.data as unknown as ApiResponse<any>;
        let message = response.message;
        if (typeof message !== 'string') {
          message = message[0];
        }
        toast(message, {
          type: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-4/5 md:w-[400px] border-2 rounded-2xl bg-white p-8">
        <h1 className="text-center text-2xl uppercase font-semibold mb-5 text-primary">Sign Up</h1>

        <form
          noValidate
          className="grid gap-4"
          onSubmit={handleSubmitSignUp}
        >
          <div>
            <input
              className={`border-2 p-2 rounded-lg block outline-0 w-full ${emailErrorMessage ? 'border-error' : ''}`}
              type="email"
              placeholder="Email"
              value={email}
              disabled={isSubmitting}
              onChange={(e) => {
                setEmailErrorMessage('');
                setEmail(e.target.value);
              }}
            />
            <span className={`${emailErrorMessage ? '' : 'hidden'} text-error`}>{emailErrorMessage}</span>
          </div>

          <div>
            <input
              className={`border-2 p-2 rounded-lg block outline-0 w-full ${passwordErrorMessage ? 'border-error' : ''}`}
              type="password"
              placeholder="Password"
              value={password}
              disabled={isSubmitting}
              onChange={(e) => {
                setPasswordErrorMessage('');
                setPassword(e.target.value);
              }}
            />
            <span className={`${passwordErrorMessage ? '' : 'hidden'} text-error`}>{passwordErrorMessage}</span>
          </div>

          <button
            className={`w-full flex items-center justify-center py-2 text-center rounded-lg bg-primary text-white ${
              isSubmitting ? 'opacity-80' : ''
            }`}
            disabled={isSubmitting}
          >
            Sign Up
            {isSubmitting && (
              <div className="w-5 h-5 ml-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          Already had an account?{' '}
          <Link
            className="text-primary"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
