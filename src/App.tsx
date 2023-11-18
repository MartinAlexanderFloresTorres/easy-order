import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/shared/layouts/MainLayout';
import AuthLayout from '@/shared/layouts/AuthLayout';

// Pages
import LoginPage from '@/auth/pages/LoginPage';
import RegistePage from '@/auth/pages/RegistePage';
import RecoverPasswordPage from '@/auth/pages/RecoverPasswordPage';
import NewPasswordPage from '@/auth/pages/NewPasswordPage';
import HomePage from '@/home/pages/HomePage';
import SubscriptionPlansPage from '@/subscription-plans/pages/SubscriptionPlansPage';
import NotFoundPage from '@/shared/pages/NotFoundPage';
import ConfirmationPage from '@/auth/pages/ConfirmationPage';
import StoriesPage from '@/stories/pages/StoriesPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistePage />} />
          <Route path="recover-password" element={<RecoverPasswordPage />} />
          <Route path="new-password/:token" element={<NewPasswordPage />} />
          <Route path="confirmation/:token" element={<ConfirmationPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="subscription-plans" element={<SubscriptionPlansPage />} />
        </Route>

        <Route path="stories/:storie" element={<StoriesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
