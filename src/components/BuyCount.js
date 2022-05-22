import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function BuyCount({ id, buyCount, handleAddBuySubmit, handleRemoveBuySubmit }) {
  return (
    <Box display="flex">
      <Box>
        <IconButton size="small" onClick={() => handleRemoveBuySubmit(id)}>
          <RemoveIcon />
        </IconButton>
      </Box>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Typography>{buyCount}</Typography>
      </Box>
      <Box>
        <IconButton size="small" onClick={() => handleAddBuySubmit(id)}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default BuyCount;
