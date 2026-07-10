import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SiteLayout from "./components/SiteLayout.jsx";
import { siteContent } from "./content/siteContent.js";
import DashboardInfoPage from "./pages/DashboardInfoPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import DeteksiDiniPage from "./pages/DeteksiDiniPage.jsx";
import EvaluationPage from "./pages/EvaluationPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MitosFaktaPage from "./pages/MitosFaktaPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PhasePage from "./pages/PhasePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ScreeningDetailPage from "./pages/ScreeningDetailPage.jsx";
import TopicPage from "./pages/TopicPage.jsx";
import WhatsAppReminderPage from "./pages/WhatsAppReminderPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

function HomeEntry(props) {
  const { isAuthReady, isAuthenticated } = useAuth();

  if (!isAuthReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return <HomePage {...props} />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            element={
              <SiteLayout
                navigation={siteContent.navigation}
                brand={siteContent.brand}
                phases={siteContent.phases}
              />
            }
          >
            <Route
              path="/"
              element={
                <HomeEntry
                  content={siteContent.home}
                  phases={siteContent.phases}
                  cerdik={siteContent.cerdik}
                  entryModules={siteContent.entryModules}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lupa-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verifikasi-email" element={<VerifyEmailPage />} />
            <Route path="/tentang-dm" element={<TopicPage page={siteContent.pages.tentangDm} />} />
            <Route
              path="/pencegahan-dm"
              element={<TopicPage page={siteContent.pages.pencegahanDm} />}
            />
            <Route path="/gizi-seimbang" element={<TopicPage page={siteContent.pages.giziSeimbang} />} />
            <Route
              path="/deteksi-dini"
              element={
                <RequireAuth>
                  <DeteksiDiniPage page={siteContent.pages.deteksiDini} />
                </RequireAuth>
              }
            />
            <Route path="/faq" element={<TopicPage page={siteContent.pages.faq} />} />
            <Route path="/fase/:slug" element={<PhasePage phases={siteContent.phases} />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage dashboard={siteContent.dashboard} phases={siteContent.phases} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/profil"
              element={
                <RequireAuth>
                  <ProfilePage phases={siteContent.phases} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/skrining/:id"
              element={
                <RequireAuth>
                  <ScreeningDetailPage />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/media-edukasi"
              element={
                <RequireAuth>
                  <DashboardInfoPage page={siteContent.dashboardPages.mediaEdukasi} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/reminder-harian"
              element={
                <RequireAuth>
                  <WhatsAppReminderPage page={siteContent.dashboardPages.reminderHarian} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/mitos-fakta"
              element={
                <RequireAuth>
                  <MitosFaktaPage page={siteContent.mitosFakta} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/tentang-aplikasi"
              element={
                <RequireAuth>
                  <DashboardInfoPage page={siteContent.dashboardPages.tentangAplikasi} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/tim-pengembang"
              element={
                <RequireAuth>
                  <DashboardInfoPage page={siteContent.dashboardPages.timPengembang} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/sumber-referensi"
              element={
                <RequireAuth>
                  <DashboardInfoPage page={siteContent.dashboardPages.sumberReferensi} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/kebijakan-privasi"
              element={
                <RequireAuth>
                  <DashboardInfoPage page={siteContent.dashboardPages.kebijakanPrivasi} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/evaluasi"
              element={
                <RequireAuth>
                  <EvaluationPage page={siteContent.evaluation} />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/umpan-balik"
              element={
                <RequireAuth>
                  <FeedbackPage page={siteContent.feedback} />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
