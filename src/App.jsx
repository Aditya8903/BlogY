import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useState } from "react";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import { Outlet } from "react-router-dom";
import "./App.css";
const App = () => {
  // console.log(import.meta.env.VITE_APPRWRITE_URL);
  const [isLoading, setLoading] = useState(true);
  const dispath = useDispatch();
  useEffect(() => {
    //get current user
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispath(login({ userData }));
        } else {
          dispath(logout());
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !isLoading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 items-center justify-center">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet /> */}
          outlet
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;
