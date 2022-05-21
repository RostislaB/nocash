import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Cookie from "js-cookie";
import Layout from "./components/Layout";
import Shops from "./pages/Shops";

function App() {
  const { auth, authChecked } = useAuth();

  useEffect(() => {
    const checkToken = () => {
      const token = Cookie.get("token");

      if (!auth && token) {
        authChecked(token);
      }
    };
    checkToken();
  }, [auth, authChecked]);

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
          <Route path="shops" element={<Shops />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
