import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { userGetCard } from "../utils/apiUrl";

function UserCard() {
  const [checks, setChecks] = useState([]);
  const navigate = useNavigate();
  const { auth, signOut } = useAuth();
  useEffect(() => {
    const getUserCard = async () => {
      const {
        data: { result, error },
      } = await axios.get(userGetCard, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });

      if (!result) {
        if (error.Code === 15 || error.Code === 16 || error.Code === 17) {
          signOut(() => navigate("/auth"));
        }
      }
      setChecks(result);
      console.log(result);
    };

    getUserCard();
  }, [auth.token, navigate, signOut]);
  return (
    <Container>
      <Box>
        {checks.map(({ hash_card }) => (
          <Box>
            <Box>{hash_card}</Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default UserCard;
