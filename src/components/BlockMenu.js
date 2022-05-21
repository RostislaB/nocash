import { Paper, Typography, Box } from "@mui/material";
import PlayForWorkIcon from "@mui/icons-material/PlayForWork";
import SearchIcon from "@mui/icons-material/Search";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function BlockMenu() {
  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        mr={3}
        p={1}
        component={Paper}
        borderRadius={4}
      >
        <Box display="flex" flex={1} justifyContent="center">
          <Box
            display="flex"
            alignItems="center"
            py={1}
            px={2}
            bgcolor="#B548C6"
            color="white"
            borderRadius={4}
          >
            <PlayForWorkIcon />
          </Box>
        </Box>
        <Box>
          <Typography align="center">Пополнить</Typography>
        </Box>
      </Box>

      <Box
        p={1}
        mr={2}
        component={Paper}
        borderRadius={4}
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flex={1} justifyContent="center">
          <Box
            display="flex"
            alignItems="center"
            py={1}
            px={2}
            borderRadius={4}
          >
            <SearchIcon fontSize="large" />
          </Box>
        </Box>
        <Box>
          <Typography align="center">Поиск</Typography>
        </Box>
      </Box>

      <Box
        p={1}
        component={Paper}
        borderRadius={4}
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flex={1} justifyContent="center">
          <Box
            display="flex"
            alignItems="center"
            py={1}
            px={2}
            borderRadius={4}
          >
            <QrCode2Icon fontSize="large" />
          </Box>
        </Box>
        <Box>
          <Typography align="center">QR</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BlockMenu;
