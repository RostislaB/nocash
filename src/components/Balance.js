import { Paper, Typography, Box } from "@mui/material";

function Balance({ balance = 0, balance_bonus = 0 }) {
  return (
    <Box display="flex" mb={6}>
      <Box flex={1} mr={3} p={2} component={Paper} borderRadius={4}>
        <Typography>Баланс:</Typography>
        <Typography variant="h5">{balance}</Typography>
      </Box>

      <Box p={2} component={Paper} borderRadius={4}>
        <Typography>Бонусы:</Typography>
        <Typography variant="h5">{balance_bonus}</Typography>
      </Box>
    </Box>
  );
}

export default Balance;
