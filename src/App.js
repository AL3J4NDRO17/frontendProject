import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Alertas Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Context
import { AuthContext } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar el AuthProvider



//Componentes
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/homepage";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import VerifyEmail from "./components/verify/VerifyEmail";
import AccountVerified from "./components/verify/AccountVerified";
import PrivateRoute from './components/routing/PrivateRoute'; // Asegúrate de ajustar la ruta de importación

import SplashScreen from './pages/splashscreen';
import NotFound from "./pages/notFound";

import AdminLayout from './components/admin/adminLayout'
import AdminDashboard from './components/admin/adminDashboard'
import AdminUsers from './components/admin/adminUsers'

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <SplashScreen />; // Muestra SplashScreen mientras `isLoading` es `true`

  return (

    <div className="App">

      <Header />
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account-verified" element={<AccountVerified />} />
          <Route path="/verify-email" element={<VerifyEmail />} /> {/* Nueva ruta */}

          {/* Rutas Protegidas para Administración */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} /> {/* Ruta predeterminada dentro de Admin */}
              <Route path="adminDashboard" element={<AdminDashboard />} />
              <Route path="adminUsers" element={<AdminUsers />} /> {/* Nueva Ruta para Admin Users */}
            </Route>
          </Route>

          {/* Ruta para Acceso Denegado o No Encontrado */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div >

  );
}

export default App;
