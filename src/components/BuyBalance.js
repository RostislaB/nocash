import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { userGet } from "../utils/apiUrl";

function BuyBalance(props) {
  const { auth, signOut } = useAuth();
  const [user, setUser] = useState({
    balance: 0,
    balance_bonus: 0,
    confirmed: true,
    id: null,
    phone_number: null,
    role_id: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { result, error },
      } = await axios.get(userGet, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });

      if (!result) {
        if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
          signOut(() => navigate("/auth"));
        }
      }

      setUser(result);
    };

    getUser();
  }, [auth.token, navigate, signOut]);
  console.log(user);
  return (
    <Box display="flex" {...props}>
      <Box flex={1} />
      <Box>
        <Box>
          <Typography variant="caption">+{user.phone_number}</Typography>
        </Box>
        <Box display="flex" justifyContent="right">
          <Typography component="span" sx={{ fontWeight: 700 }}>
            {user.balance + user.balance_bonus}₽
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BuyBalance;
