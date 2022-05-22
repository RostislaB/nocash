import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Cookie from "js-cookie";
import Layout from "./components/Layout";
import Shops from "./pages/Shops";
import Qrcode from "./pages/Qrcode";
import ShopId from "./pages/ShopId";
import AddBalance from "./pages/AddBalance";
import ShopCheck from "./pages/ShopCheck";
import UserCard from "./pages/UserCard";

function App() {
  const { auth, authChecked } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = Cookie.get("token");

      if (!auth && token) {
        authChecked(token, () => navigate(location));
      }
    };
    checkToken();
  }, [auth, authChecked, navigate, location]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Routes>
        <Route
          path={"/"}
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Main />} />
          <Route path="/card" element={<UserCard />} />
          <Route path="shops" element={<Shops />} />
          <Route path="qrcode" element={<Qrcode />} />
          <Route path="shop/:id" element={<ShopId />} />
          <Route path="/shop/:id/check/:hash_card" element={<ShopCheck />} />
          <Route path="add-balance" element={<AddBalance />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
