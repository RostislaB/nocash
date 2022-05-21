import { Box, Container, Typography } from "@mui/material";
import Balance from "../components/Balance";
import Info from "../components/Info";
import BlockMenu from "../components/BlockMenu";
import { useAuth } from "../hook/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { userGet } from "../utils/apiUrl";
import { useNavigate } from "react-router-dom";

function Main() {
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

  return (
    <Container>
      <Box flexDirection="column" p={(0, 6)}>
        <Typography align="center">+{user.phone_number}</Typography>
        <Typography align="center">Анапа, температура воды: 22c</Typography>
      </Box>

      <Info />

      <Balance balance={user.balance} balance_bonus={user.balance_bonus} />

      <BlockMenu />
    </Container>
  );
}

export default Main;
