import { useState } from 'react';
import Modal from '@/shared/components/Modal';
import LoginForm from '@/auth/components/LoginForm';
import RecoverPasswordForm from '@/auth/components/RecoverPasswordForm';

interface ModalLoginProps {
  onClose: () => void;
}

let timer: NodeJS.Timeout | null = null;

const ModalLogin = ({ onClose }: ModalLoginProps) => {
  const [isClose, setIsClose] = useState(false);
  const [isOpenRecoverPassword, setIsOpenRecoverPassword] = useState(false);

  const onCloseRecoverPassword = () => {
    window.history.pushState({}, '', '/auth/login');
    setIsOpenRecoverPassword(false);
  };
  const onOpenRecoverPassword = () => {
    window.history.pushState({}, '', '/auth/recover-password');
    setIsOpenRecoverPassword(true);
  };

  const onCloseModalLogin = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };

  return (
    <Modal onClose={onCloseModalLogin} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="flex min-h-full items-center justify-center flex-1 flex-col p-4"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          event.stopPropagation();
          onCloseModalLogin();
        }}
      >
        {isOpenRecoverPassword ? (
          <RecoverPasswordForm showClose onFinished={onCloseRecoverPassword} />
        ) : (
          <LoginForm changeToRecoverPassword={onOpenRecoverPassword} showClose onFinished={onCloseModalLogin} />
        )}
      </div>
    </Modal>
  );
};

export default ModalLogin;
