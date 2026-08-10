import { Routes, Route } from 'react-router-dom';
import ShowOrgPage from './pages/ShowOrgPage';
import SetupOrgPage from './pages/SetupOrgPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<ShowOrgPage />} />
        <Route path="/setup-org" element={<SetupOrgPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}

export default App;
