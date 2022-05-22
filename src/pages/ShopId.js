import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlockProdavets from "../components/BlockProdavets";
import BuyBalance from "../components/BuyBalance";
import BuyCount from "../components/BuyCount";
import { useAuth } from "../hook/useAuth";
import { shopGetId } from "../utils/apiUrl";

function ShopId() {
  const params = useParams();
  const navigate = useNavigate();
  const { auth, signOut } = useAuth();
  const [shop, setShop] = useState({
    shop: {
      id: null,
      name: "",
      image: "",
      description: "",
    },
    items: [],
  });

  //   Покупка
  const [itog, setItog] = useState(0);
  const [buyItems, setBuyItems] = useState([]);
  const handleBuySubmit = (id, price) => {
    setBuyItems([
      ...buyItems,
      {
        id,
        price,
        buyCount: 1,
      },
    ]);
  };
  const handleAddBuySubmit = (id) => {
    setBuyItems(
      buyItems.map((item) => {
        if (item.id === id) {
          item.buyCount += 1;
          return item;
        }
        return item;
      })
    );
  };
  const handleRemoveBuySubmit = (id) => {
    setBuyItems(
      buyItems.map((item) => {
        if (item.id === id) {
          item.buyCount -= 1;
          return item;
        }
        return item;
      })
    );
    setBuyItems(buyItems.filter((item) => item.buyCount !== 0));
  };

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

  useEffect(() => {
    const summItog = () => {
      let preItog = 0;
      buyItems.forEach((item) => {
        preItog += item.price * item.buyCount;
      });
      // setBuyItems(buyItems.filter((item) => item.buyCount !== 0));
      setItog(preItog);
    };
    summItog();
  }, [buyItems]);

  return (
    <>
      <Container maxWidth="sm" sx={{ mb: 8 }}>
        <BuyBalance mb={2} />

        <BlockProdavets shop={shop.shop} />
        {!shop.items.length ? (
          <Typography sx={{ mt: 2 }} variant="h6" align="center">
            Пусто..
          </Typography>
        ) : (
          <Grid
            mt={1}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {shop.items.map(({ id, name, price, image, description }) => (
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
                    <Box display="flex" mb={1}>
                      <Typography sx={{ flex: 1 }}>{name}</Typography>
                      <Typography>{price} ₽</Typography>
                    </Box>
                    <Box display="flex">
                      <img width="100%" alt={name} src={image} />
                    </Box>
                    <Box my={1}>
                      <Typography variant="caption">{description}</Typography>
                    </Box>
                  </Box>
                  {!buyItems.find((item) => item.id === id) ? (
                    <Button
                      fullWidth
                      size="small"
                      onClick={() => handleBuySubmit(id, price)}
                    >
                      Купить
                    </Button>
                  ) : (
                    <BuyCount
                      {...buyItems.find((item) => item.id === id)}
                      handleAddBuySubmit={handleAddBuySubmit}
                      handleRemoveBuySubmit={handleRemoveBuySubmit}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Box
        position="fixed"
        bottom={70}
        display="flex"
        width="100%"
        justifyContent="center"
      >
        <Button
          disabled={!itog ? true : false}
          variant="contained"
          color="success"
        >
          {itog.toFixed(2)}₽ Оплатить
        </Button>
      </Box>
    </>
  );
}

export default ShopId;
