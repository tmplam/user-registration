import { apiLogin } from '@/apis';
import { ApiResponse } from '@/models/apiResponse';
import { useUserStore } from '@/store';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Login() {
  const navigate = useNavigate();
  const { setAccessToken } = useUserStore();

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let valid = true;

    if (email == '') {
      valid = false;
      setEmailErrorMessage('This field is required.');
    }

    if (password == '') {
      valid = false;
      setPasswordErrorMessage('This field is required.');
    }

    if (valid) {
      setIsSubmitting(true);
      try {
        const response = await apiLogin({ email, password });
        setAccessToken(response.data.access_token);
        toast(response.message, {
          type: 'success',
        });
        navigate('/');
      } catch (error) {
        const response = (error as AxiosError)!.response?.data as unknown as ApiResponse<unknown>;
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
        <h1 className="text-center text-2xl uppercase font-semibold mb-5 text-primary">Login</h1>

        <form
          noValidate
          className="grid gap-4"
          onSubmit={handleSubmitLogin}
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
            Login
            {isSubmitting && (
              <div className="w-5 h-5 ml-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          Not have an account?{' '}
          <Link
            className="text-primary"
            to="/register"
          >
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
}
