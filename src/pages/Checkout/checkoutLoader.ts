import { ActionFunction, redirect } from 'react-router-dom';
import { StoreType } from '../../store';
import { toast } from 'react-toastify';

const loader = (store: StoreType) =>
  function () {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to checkout');
      return redirect('/login');
    }
    return null;
  } satisfies ActionFunction;

export default loader;
