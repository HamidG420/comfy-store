import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../RTKHooks';
import { clearCart } from '../features/cart/cartSlice';
import { logoutUser } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);
  const location = useLocation();
  const queryClient = useQueryClient();
  const currentPath = location.pathname;
  const logoutBtnHandler = function () {
    navigate('/');
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              type="button"
              className="btn btn-xs btn-outline btn-primary"
              onClick={logoutBtnHandler}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link
              to="/login"
              state={{ from: currentPath }}
              className="link link-hover text-xs sm:text-sm"
            >
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
