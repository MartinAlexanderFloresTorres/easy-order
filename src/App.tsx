import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/shared/layouts/MainLayout';
import AuthLayout from '@/shared/layouts/AuthLayout';

// Pages
import LoginPage from '@/auth/pages/LoginPage';
import RegistePage from '@/auth/pages/RegistePage';
import RecoverPasswordPage from '@/auth/pages/RecoverPasswordPage';
import NewPasswordPage from '@/auth/pages/NewPasswordPage';
import SubscriptionPlansPage from '@/subscription-plans/pages/SubscriptionPlansPage';
import NotFoundPage from '@/shared/pages/NotFoundPage';
import ConfirmationPage from '@/auth/pages/ConfirmationPage';
import StoriesPage from '@/stories/pages/StoriesPage';
import StoriesProvider from '@/stories/providers/StoriesProvider';
import PublicationPage from '@/publication/pages/PublicationPage';
import PublicationsPage from '@/publication/pages/PublicationsPage';
import TabsLayout from '@/shared/layouts/TabsLayout';
import PublicProvider from '@/shared/providers/PublicProvider';
import RestaurantsPage from '@/restaurant/pages/RestaurantsPage';
import CategoriesPage from '@/category/pages/CategoriesPage';
import OffersPage from '@/offer/pages/OffersPage';

const App = () => {
  return (
    <BrowserRouter>
      <PublicProvider>
        <StoriesProvider>
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
              <Route path="subscription-plans" element={<SubscriptionPlansPage />} />
              <Route path="publication/by/:id" element={<PublicationPage />} />

              <Route path="/" element={<TabsLayout />}>
                <Route index element={<PublicationsPage />} />
                <Route path="restaurants" element={<RestaurantsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="offers" element={<OffersPage />} />
              </Route>
            </Route>

            <Route path="stories/:storie" element={<StoriesPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </StoriesProvider>
      </PublicProvider>
    </BrowserRouter>
  );
};

export default App;
