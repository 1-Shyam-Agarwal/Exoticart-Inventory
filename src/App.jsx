import { Routes, Route } from 'react-router-dom';
import ShowOrgPage from './pages/ShowOrgPage';
import SetupOrgPage from './pages/SetupOrgPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<ShowOrgPage />} />
        <Route path="/org/setup" element={<SetupOrgPage />} />
        <Route path="/org/active/:id" element={<Dashboard/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}

export default App;
