import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'mapbox-gl/dist/mapbox-gl.css';

// Layouts
import MainLayout from '@/shared/layouts/MainLayout';
import AuthLayout from '@/shared/layouts/AuthLayout';

// Pages
import AccountProvider from '@/account/providers/AccountProvider';
import AutocConfirmationPage from '@/auth/pages/AutocConfirmationPage';
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
import RestaurantsPage from '@/restaurant/pages/public/RestaurantsPage';
import OffersPage from '@/offer/pages/OffersPage';
import MenusPage from '@/shared/pages/MenusPage';

import RestaurantLayout from '@/restaurant/layouts/admin/RestaurantLayout';
import RestaurantPreviewPage from '@/restaurant/pages/admin/RestaurantPreviewPage';
import ResturantMenuPage from '@/restaurant/pages/admin/ResturantMenuPage';
import RestaurantOrdersPage from '@/restaurant/pages/admin/RestaurantOrdersPage';
import RestaurantStoriesPage from '@/restaurant/pages/admin/RestaurantStoriesPage';
import RestaurantPublicationsPage from '@/restaurant/pages/admin/RestaurantPublicationsPage';
import RestaurantCategoriesPage from '@/restaurant/pages/admin/RestaurantCategoriesPage';
import RestaurantUsersPage from '@/restaurant/pages/admin/RestaurantUsersPage';
import RestaurantTablesPage from '@/restaurant/pages/admin/RestaurantTablesPage';
import RestaurantOpeningClosingTimesPage from '@/restaurant/pages/admin/RestaurantOpeningClosingTimesPage';
import RestaurantSalesPage from '@/restaurant/pages/admin/RestaurantSalesPage';
import RestaurantReportsPage from '@/restaurant/pages/admin/RestaurantReportsPage';
import RestaurantSettings from '@/restaurant/pages/admin/RestaurantSettings';
import RestaurantSubscriptionPlanPage from '@/restaurant/pages/admin/RestaurantSubscriptionPlanPage';
import NewRestaurantPage from '@/restaurant/pages/new/NewRestaurantPage';
import ResturantLayout from '@/restaurant/layouts/public/ResturantLayout';
import MenuBySlugPage from '@/restaurant/pages/public/MenuBySlugPage';
import MenusByProviderPage from '@/restaurant/pages/public/MenusByProviderPage';
import RestaurantPublicProvider from '@/restaurant/providers/RestaurantPublicProvider';
import CartProvider from '@/cart/providers/CartProvider';
import CheckoutPage from '@/cart/pages/CheckoutPage';
import AccountLayout from '@/account/layouts/AccountLayout';
import OrdersPage from '@/account/pages/OrdersPage';
import OrderPaymentPage from '@/restaurant/pages/OrderPaymentPage';
import PhotosByProviderPage from '@/restaurant/pages/public/PhotosByProviderPage';
import RestaurantCouponsPage from './restaurant/pages/admin/RestaurantCouponsPage';
import TableOrdersPage from './account/pages/TableOrdersPage';
import TableOrderPaymentPage from './restaurant/pages/public/TableOrderPaymentPage';
import RestaurantTableOrdersPage from './restaurant/pages/admin/RestaurantTableOrdersPage';

const App = () => {
  return (
    <AccountProvider>
      <BrowserRouter>
        <CartProvider>
          <PublicProvider>
            <StoriesProvider>
              <Routes>
                {/* Auth */}
                <Route path="/auth" element={<AuthLayout />}>
                  <Route index element={<Navigate to="/auth/login" />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegistePage />} />
                  <Route path="recover-password" element={<RecoverPasswordPage />} />
                  <Route path="new-password/:token" element={<NewPasswordPage />} />
                  <Route path="confirmation/:token" element={<ConfirmationPage />} />
                  <Route path="confirmation/:token/:code" element={<AutocConfirmationPage />} />
                </Route>
                {/* LAYOUT PRINCIPAL */}
                <Route path="/" element={<MainLayout />}>
                  <Route path="subscription-plans" element={<SubscriptionPlansPage />} />
                  <Route path="publication/by/:id" element={<PublicationPage />} />
                  <Route path="/" element={<TabsLayout />}>
                    <Route index element={<PublicationsPage />} />
                    <Route path="restaurants" element={<RestaurantsPage />} />
                    <Route path="menus" element={<MenusPage />} />
                    <Route path="offers" element={<OffersPage />} />
                  </Route>

                  {/* PROVIDER */}
                  <Route
                    path="/r/:provider"
                    element={
                      <RestaurantPublicProvider>
                        <ResturantLayout />
                      </RestaurantPublicProvider>
                    }
                  >
                    <Route index element={<h2>Provider</h2>} />
                    <Route path="menus" element={<MenusByProviderPage />} />
                    <Route path="menus/by/:slug" element={<MenuBySlugPage />} />
                    <Route path="photos" element={<PhotosByProviderPage />} />
                  </Route>

                  {/* Cart */}
                  <Route path="checkout/payment" element={<CheckoutPage />} />

                  {/* Acount */}
                  <Route path="account" element={<AccountLayout />}>
                    <Route path="profile" element={<h2>Profile</h2>} />
                    <Route path="online-orders" element={<OrdersPage />} />
                    <Route path="table-orders" element={<TableOrdersPage />} />
                    <Route path="subscription-plan" element={<h2>Subscription</h2>} />
                    <Route path="settings" element={<h2>Settings</h2>} />
                  </Route>
                </Route>

                {/* Stories by id */}
                <Route path="stories/:storie" element={<StoriesPage />} />

                {/*  Restaurant Admin */}
                <Route path="/panel/:provider" element={<RestaurantLayout />}>
                  <Route index element={<RestaurantPreviewPage />} />
                  <Route path="online-orders" element={<RestaurantOrdersPage />} />
                  <Route path="table-orders" element={<RestaurantTableOrdersPage />} />
                  <Route path="menu" element={<ResturantMenuPage />} />
                  <Route path="coupons" element={<RestaurantCouponsPage />} />
                  <Route path="stories" element={<RestaurantStoriesPage />} />
                  <Route path="publications" element={<RestaurantPublicationsPage />} />
                  <Route path="categories" element={<RestaurantCategoriesPage />} />
                  <Route path="users" element={<RestaurantUsersPage />} />
                  <Route path="tables" element={<RestaurantTablesPage />} />
                  <Route path="opening-closing-times" element={<RestaurantOpeningClosingTimesPage />} />
                  <Route path="sales" element={<RestaurantSalesPage />} />
                  <Route path="subscription-plan" element={<RestaurantSubscriptionPlanPage />} />
                  <Route path="reports" element={<RestaurantReportsPage />} />
                  <Route path="settings" element={<RestaurantSettings />} />
                </Route>

                {/* New Restaurant */}
                <Route path="/restaurant/new/:token" element={<NewRestaurantPage />} />

                {/* ORDER */}
                <Route path="online-orders/:restaurantId/by/:orderId" element={<OrderPaymentPage />} />
                <Route path="table-orders/:restaurantId/by/:orderId" element={<TableOrderPaymentPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </StoriesProvider>
          </PublicProvider>
        </CartProvider>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          style: {
            background: '#242424',
            color: '#fff',
            border: '1px solid #3b3b3b',
          },
        }}
        position="bottom-right"
      />
    </AccountProvider>
  );
};

export default App;
