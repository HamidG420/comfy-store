import { ActionFunction, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { StoreType } from '../../store';
import { loginUser } from '../../features/user/userSlice';
import { customFetch } from '../../utils';

const url = '/auth/local';
type LoginFormDataKeys = 'identifier' | 'password' | 'intent';

const action = (store: StoreType) =>
  async function ({ request }) {
    const formData = await request.formData();
    const intent = formData.get('intent');
    const data = Object.fromEntries(formData) as {
      [k in LoginFormDataKeys]: string;
    };

    try {
      const response = await customFetch.post(url, data);
      store.dispatch(loginUser(response.data));
      toast.success('Logged in successfully!');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(intent ? redirect(intent.toString()) : redirect('/'));
        }, 2000);
      });
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

export default action;
