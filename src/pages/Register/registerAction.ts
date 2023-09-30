import type { ActionFunction } from 'react-router';
import { redirect } from 'react-router-dom';
import { customFetch } from '../../utils';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const url = '/auth/local/register';
type RegisterFormDataKeys = 'email' | 'username' | 'password';

const registerAction = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [k in RegisterFormDataKeys]: string;
  };

  try {
    await customFetch.post(url, data);
    toast.success('Account created successfully');
    return redirect('/login');
  } catch (error) {
    // check if the error was thrown from axios
    if (isAxiosError(error)) {
      // do something
      // or just re-throw the error
      const errorMessage: string =
        error?.response?.data?.error?.message ||
        'Please double check your credentials';
      toast.error(errorMessage);
    } else {
      console.log(error);
    }
    return null;
  }
} satisfies ActionFunction;
export default registerAction;
