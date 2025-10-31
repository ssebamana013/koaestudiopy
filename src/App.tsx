import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Home } from './pages/Home';
import { EventGallery } from './pages/EventGallery';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { Download } from './pages/Download';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { CreateEvent } from './pages/admin/CreateEvent';
import { EventDetails } from './pages/admin/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventGallery />} />
            <Route path="/checkout/:eventId" element={<Checkout />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/download/:orderId" element={<Download />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events/new" element={<CreateEvent />} />
            <Route path="/admin/events/:eventId" element={<EventDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
