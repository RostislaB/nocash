import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

function MobileView() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
          <BottomNavigationAction icon={<BarChartIcon />} />
          <BottomNavigationAction icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default MobileView;
