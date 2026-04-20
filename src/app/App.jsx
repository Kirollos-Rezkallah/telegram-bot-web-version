import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminPage } from '../pages/AdminPage/AdminPage';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MessengerPage } from '../pages/MessengerPage/MessengerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<MessengerPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
