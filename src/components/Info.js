import { Paper, Typography, Box } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function Info() {
  return (
    <Box
      display="flex"
      mb={6}
      p={1}
      borderRadius={4}
      component={Paper}
      sx={{
        backgroundColor: "rgba(248, 157, 157, 0.74)",
      }}
    >
      <Box display="dlex" alignItems="center">
        <Box
          ml={1}
          mr={2}
          p={1}
          bgcolor="#D91212"
          color="white"
          borderRadius={4}
        >
          <WarningAmberIcon />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Штормовое предупреждение!
        </Typography>
        <Typography>На пляжах Анапы ожидается шторм 22.05.2022</Typography>
      </Box>
    </Box>
  );
}

export default Info;
