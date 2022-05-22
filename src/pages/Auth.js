import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { authCheckCode, authCode } from "../utils/apiUrl";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const [stage, setStage] = useState(0);
  const [phone, setPhone] = useState("7");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(null);

  if (auth) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stage) {
      const { data } = await axios.post(authCode, {
        number_phone: phone,
      });

      if (data.result.status === "OK") {
        setUserId(data.result.user_id);
        setStage(1);
      }
    } else {
      const { data } = await axios.post(authCheckCode, {
        user_id: parseInt(userId),
        code,
      });

      if (data.result?.status === "OK") {
        const { token } = data.result;
        const auth = jwt_decode(token);
        Cookies.set("token", token);
        signIn({ ...auth, token }, () => navigate(fromPage));
      }
    }
  };

  const handleInputPhone = (e) => {
    if (!e.target.value.length) {
      return;
    }
    setPhone(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleInputCode = (e) => {
    setCode(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Typography align="center" sx={{ my: 2 }}>
            Travel coast
          </Typography>
          <Typography align="center">
            Платёжная бонусная система для оплаты товаров и услуг на пляжах
          </Typography>
        </Box>
      </Container>

      <Box
        display="flex"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box p={2}>
          <form onSubmit={handleSubmit}>
            {!stage ? (
              <>
                <Typography
                  align="center"
                  variant="h5"
                  component="h1"
                  sx={{ mb: 2 }}
                >
                  Телефон
                </Typography>
                <TextField
                  type="text"
                  autoFocus
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+</InputAdornment>
                    ),
                  }}
                  value={phone}
                  onChange={handleInputPhone}
                  variant="standard"
                  sx={{
                    mb: 4,
                  }}
                />
              </>
            ) : (
              <>
                <Typography
                  align="center"
                  variant="h5"
                  component="h1"
                  sx={{ mb: 2 }}
                >
                  Подтверждение
                </Typography>
                <TextField
                  type="text"
                  autoFocus
                  fullWidth
                  value={code}
                  onChange={handleInputCode}
                  variant="standard"
                  sx={{
                    mb: 1,
                  }}
                />
                <Typography align="center" sx={{ mb: 3 }}>
                  Вам поступит звонок, введите последние 4 цифры номера.
                </Typography>
              </>
            )}

            <Button type="submit" fullWidth variant="contained">
              Продолжить
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Auth;
