import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { userAddBalance } from "../utils/apiUrl";

function AddBalance() {
  const [addBalance, setAddBalance] = useState("");
  const { auth, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAddBalance = (e) => {
    setAddBalance(e.target.value.replace(/[^0-9]/g, ""));
  };

  const clickAddBalance = async () => {
    const {
      data: { result, error },
    } = await axios.post(
      userAddBalance,
      {
        value: parseInt(parseInt(addBalance).toFixed(2)),
      },
      {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      }
    );
    if (!result) {
      if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
        signOut(() => navigate("/auth"));
      }
    }
    if (result.status === "OK") navigate("/");
  };
  return (
    <Container maxWidth="xs">
      <form>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            placeholder="Сумма пополнения"
            value={addBalance}
            onChange={handleAddBalance}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₽</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Box display="flex" justifyContent="center">
          <Button
            disabled={!addBalance ? true : false}
            variant="contained"
            onClick={clickAddBalance}
          >
            Пополнить
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddBalance;
