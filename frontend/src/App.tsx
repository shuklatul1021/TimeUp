import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MonitorsPage } from "./pages/MonitorsPage";
import { IncidentsPage } from "./pages/IncidentsPage";
import { StatusPagesPage } from "./pages/StatusPagesPage";
import { AlertsPage } from "./pages/AlertsPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/monitors" element={<MonitorsPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/status-pages" element={<StatusPagesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
