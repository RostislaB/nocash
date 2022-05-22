import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";

function MobileView() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const reloads = () => {
      if (
        location.pathname.split("/")[1] === "shops" ||
        location.pathname.split("/")[1] === "shop"
      ) {
        setValue(1);
      }
      if (location.pathname.split("/")[1] === "card") {
        setValue(2);
      }
    };
    reloads();
  }, [location]);

  return (
    <>
      <Box pt={2} pb={7}>
        <Outlet />
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => {
              navigate("/");
            }}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/shops");
            }}
            icon={<GridViewIcon />}
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/card");
            }}
            icon={<ShoppingCartIcon />}
          />
          <BottomNavigationAction icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default MobileView;
