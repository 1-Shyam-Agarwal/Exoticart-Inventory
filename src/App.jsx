import { Routes, Route } from 'react-router-dom';
import ShowOrgPage from './pages/ShowOrgPage';
import SetupOrgPage from './pages/SetupOrgPage';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import { DashboardLayout } from './components/organisms/dashboard/DashboardLayout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<ShowOrgPage />} />
        <Route path="/org/setup" element={<SetupOrgPage />} />
        <Route path="/org/active/:id" element={<DashboardLayout/>}>
          <Route path="products" element={<ProductsPage/>} />
          <Route path="analytics" element={<Dashboard/>} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}

export default App;
