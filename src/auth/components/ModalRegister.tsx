import { useState } from 'react';
import Modal from '@/shared/components/Modal';
import RegisterForm from '@/auth/components/RegisterForm';
import ModalLogin from '@/auth/components/ModalLogin';

interface ModalRegisterProps {
  onClose: () => void;
}

let timer: NodeJS.Timeout | null = null;

const ModalRegister = ({ onClose }: ModalRegisterProps) => {
  const [isClose, setIsClose] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const onCloserRegister = () => {
    window.history.pushState({}, '', '/auth/register');
    setIsOpenLogin(false);
  };
  const onOpenLogin = () => {
    window.history.pushState({}, '', '/auth/login');
    setIsOpenLogin(true);
  };

  const onCloseModalRegister = () => {
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
    <Modal onClose={onCloseModalRegister} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="flex min-h-full items-center justify-center flex-1 flex-col p-4"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          event.stopPropagation();
          onCloseModalRegister();
        }}
      >
        {isOpenLogin ? (
          <ModalLogin
            onClose={() => {
              onCloserRegister();
              onCloseModalRegister();
            }}
          />
        ) : (
          <RegisterForm changeToLogin={onOpenLogin} showClose onFinished={onCloseModalRegister} />
        )}
      </div>
    </Modal>
  );
};

export default ModalRegister;
