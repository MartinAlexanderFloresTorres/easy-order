import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAccount from '../hooks/useAccount';

const AccountLayout = () => {
  const { authenticated, loadingAuthenticate } = useAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (loadingAuthenticate) return null;

  if (!authenticated) {
    setTimeout(() => {
      navigate('/auth/login', {
        state: { from: pathname },
      });
    }, 0);
    return null;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
