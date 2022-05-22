import { Box, Typography } from "@mui/material";

function BuyBalance({
  balance = 0,
  balance_bonus = 0,
  phone_number = "",
  ...rest
}) {
  return (
    <Box display="flex" {...rest}>
      <Box flex={1} />
      <Box>
        <Box>
          <Typography variant="caption">+{phone_number}</Typography>
        </Box>
        <Box display="flex" justifyContent="right">
          <Typography component="span" sx={{ fontWeight: 700 }}>
            {balance + balance_bonus}₽
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BuyBalance;
