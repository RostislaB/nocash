import { Box, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { shopsGet } from "../utils/apiUrl";

function Shops() {
  const { auth, signOut } = useAuth();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getShops = async () => {
      const {
        data: { result, error },
      } = await axios.get(shopsGet, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });
      if (!result) {
        if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
          signOut(() => navigate("/auth"));
        }
      }

      setShops(result);
    };
    getShops();
  }, [auth.token, navigate, signOut]);

  return (
    <Container>
      {shops.map(({ id, name, image }) => (
        <Box
          key={id}
          component={Paper}
          p={2}
          mb={2}
          sx={{
            cursor: "pointer",
            borderRadius: 4,
          }}
          onClick={() => navigate(`/shop/${id}`)}
        >
          <Typography variant="h5">{name}</Typography>
          <Box display="flex" justifyContent="center">
            <img width="100%" src={image} alt={name} />
          </Box>
        </Box>
      ))}
    </Container>
  );
}

export default Shops;
