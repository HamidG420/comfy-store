import { useDispatch } from 'react-redux';
import { FormInput, SubmitButton } from '../../components';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { customFetch } from '../../utils';
import { loginUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';

const url = '/auth/local';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginAsGuestUserBtnHandler = async function () {
    try {
      const response = await customFetch.post(url, {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('Welcome guest user');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(navigate(location.state?.from || '/'));
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      toast.error('Guest user login error. Please try again.');
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 flex flex-col gap-y-4 bg-base-100 shadow-lg"
      >
        <h4 className="text-3xl font-bold text-center">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />

        <input type="hidden" name="intent" value={location.state?.from} />

        <div className="mt-4">
          <SubmitButton text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUserBtnHandler}
        >
          Guest User
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
