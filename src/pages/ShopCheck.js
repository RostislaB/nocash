import { Box, Container, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useAuth } from "../hook/useAuth";
import { useEffect } from "react";
import { shopCheck } from "../utils/apiUrl";

function ShopCheck() {
  const { id, hash_card } = useParams();
  const navigate = useNavigate();
  const { auth, signOut } = useAuth();
  useEffect(() => {
    const getShopCheck = async () => {
      const {
        data: { result, error },
      } = await axios.get(shopCheck(id) + "/" + hash_card, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });

      if (!result) {
        if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
          signOut(() => navigate("/auth"));
        }
      }

      console.log(result);
    };

    getShopCheck();
  }, [auth.token, navigate, signOut, id, hash_card]);
  return (
    <Container>
      <Box component={Paper} mt={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CheckIcon color="success" fontSize="large" />
          <Typography>Оплачено</Typography>
        </Box>
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4">{hash_card}</Typography>
          <Typography>Код заказа</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ShopCheck;
