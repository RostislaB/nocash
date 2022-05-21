import { Avatar, Box, Paper, Typography } from "@mui/material";

function BlockProdavets({ shop }) {
  return (
    <Box display="flex" p={1} component={Paper} sx={{ borderRadius: 4 }}>
      <Box mr={1} display="flex" alignItems="center">
        <Avatar
          alt={shop.name}
          src={shop.image}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Box>
        <Typography variant="h5">{shop.name}</Typography>
        <Typography>{shop.description}</Typography>
      </Box>
    </Box>
  );
}

export default BlockProdavets;
