//Olá {user && user.name}

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Card,
  Grid,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

function Edit() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
    try {
      const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/login?id=${id}`);
      const userData = response.data;
      console.log(response.data);
      setName(userData.name);
      setEmail(userData.email);
    };

    fetchData();
  } catch (error) {
  console.error("Error fetching user data:", error);
  }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/users/${id}`, {
        name,
        email,
        password,
      });
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Grid
      container
      component="main"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        height: "100vh",
        backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          py: 8,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        xs={12}
        sm={8}
        md={5}
        component={Card}
        elevation={6}
        square
      >
        <Typography component="h1" variant="h4">
          Editar Perfil
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="text"
            autoComplete="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => handleSubmit(e)}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default Edit;
