import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from '@/routes/home';
import { PortfolioPage } from '@/routes/portfolio';
import { ProjectDetailPage } from '@/routes/project-detail';
import { AboutPage } from '@/routes/about';
import { ContactPage } from '@/routes/contact';
import { ServicesPage } from '@/routes/services';
import { PricingPage } from '@/routes/pricing';
import { AdminPage } from '@/routes/admin';
import { ClientPortalPage } from '@/routes/client-portal';
import { NotFoundPage } from '@/routes/not-found';
import { MaintenancePage } from '@/components/MaintenancePage';
import { fetchSiteSettings } from '@/lib/api';
import '@/index.css';

/**
 * App shell that checks maintenance mode before rendering any public page.
 * /admin is ALWAYS accessible regardless of maintenance mode (admin needs to be
 * able to turn maintenance mode OFF again).
 */
function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    // Skip maintenance check for admin route
    if (isAdminRoute) {
      setChecked(true);
      return;
    }
    fetchSiteSettings()
      .then((data) => {
        setMaintenanceMode(Boolean(data?.maintenanceMode));
        setMaintenanceMessage(data?.maintenanceMessage || "We're currently performing scheduled maintenance. Please check back shortly! 🚀");
      })
      .catch(() => {
        // If backend unreachable, don't block the site
        setMaintenanceMode(false);
      })
      .finally(() => setChecked(true));
  }, [isAdminRoute]);

  // Brief loading state (prevents flash)
  if (!checked) return null;

  // Show maintenance page to public when mode is ON
  if (maintenanceMode && !isAdminRoute) {
    return <MaintenancePage message={maintenanceMessage} />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/client-portal" element={<ClientPortalPage />} />
      <Route path="/client-portal/:slug" element={<ClientPortalPage />} />
      <Route path="/proof/:slug" element={<ClientPortalPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </React.StrictMode>
);
