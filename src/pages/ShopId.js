import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlockProdavets from "../components/BlockProdavets";
import { useAuth } from "../hook/useAuth";
import { shopGetId } from "../utils/apiUrl";

function ShopId() {
  const params = useParams();
  const navigate = useNavigate();
  const { auth, signOut } = useAuth();
  const [shop, setShop] = useState({
    Shop: {
      id: null,
      name: "",
      image: "",
      description: "",
    },
    Items: [],
  });

  useEffect(() => {
    const getShop = async () => {
      const {
        data: { result, error },
      } = await axios.get(shopGetId(params.id), {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });
      if (!result) {
        if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
          signOut(() => navigate("/auth"));
        }
      }
      setShop(result);
    };
    getShop();
  }, [auth.token, navigate, params.id, signOut]);
  console.log(shop);
  return (
    <Container>
      <BlockProdavets shop={shop.Shop} />

      <Grid
        mt={1}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {shop.Items.map(({ id, name, price, image }) => (
          <Grid item xs={6} key={id}>
            <Box
              key={id}
              display="flex"
              flexDirection="column"
              component={Paper}
              sx={{ borderRadius: 4 }}
              p={1}
              height="100%"
            >
              <Box flex={1}>
                <Box display="flex">
                  <Typography sx={{ flex: 1 }}>{name}</Typography>
                  <Typography>{price} ₽</Typography>
                </Box>
                <Box display="flex">
                  <img width="100%" alt={name} src={image} />
                </Box>
              </Box>
              <Box>купить</Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* {shop.Items.map(({ id, name, price, image }) => (
        <Box
          key={id}
          display="flex"
          flexDirection="column"
          component={Paper}
          p={1}
          sx={{ borderRadius: 4 }}
        >
          <Box display="flex">
            <img width="100%" alt={name} src={image} />
          </Box>
          <Box>
            <Typography>{name}</Typography>
            <Typography>{price}</Typography>
          </Box>
        </Box>
      ))} */}
    </Container>
  );
}

export default ShopId;
