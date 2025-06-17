import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ChatProvider } from './contexts/ChatContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { OfflineIndicator } from './components/offline/OfflineIndicator';

// Pages
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import TripDetailPage from './pages/TripDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingPage from './pages/BookingPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';
import TrackingPage from './pages/TrackingPage';
import ReviewsPage from './pages/ReviewsPage';
import CreateTripPage from './pages/CreateTripPage';
import SettingsPage from './pages/SettingsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import LegalPages from './pages/LegalPages';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <ChatProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <OfflineIndicator />
                
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/trip/:id" element={<TripDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/create-trip" element={<CreateTripPage />} />
                    <Route path="/booking/:tripId" element={<BookingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/messages" element={<ChatPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/payment/:bookingId" element={<PaymentPage />} />
                    <Route path="/tracking" element={<TrackingPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    
                    {/* Legal Pages */}
                    <Route path="/terms" element={<LegalPages />} />
                    <Route path="/privacy" element={<LegalPages />} />
                    <Route path="/cookies" element={<LegalPages />} />
                    <Route path="/legal" element={<LegalPages />} />
                    
                    {/* Admin */}
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Routes>
                </main>
                
                <Footer />
              </div>
            </Router>
          </ChatProvider>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;