import { AppBar, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

function BrowserView() {
  return (
    <>
      <AppBar>
        <Toolbar>Travel coast</Toolbar>
      </AppBar>
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default BrowserView;
