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
  Alert
} from "@mui/material";

function Edit() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/login?id=${id}`);
        const userData = response.data;
        console.log(response.data);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    setEmailValid(validateEmail(email));
    // Validate password
    setPasswordValid(validatePassword(password));

    // Check if all fields are valid
    if (emailValid && passwordValid) {
      try {
        const response = await axios.patch(`http://localhost:3000/users/${id}`, {
          name,
          email,
          password,
        });
        console.log("User updated:", response.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Remove success message after 3 seconds
      } catch (error) {
        console.error("Error updating user:", error);
        setErrorMessage("Erro atualizando usuário. Tente novamente");
      }
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Basic password length validation
    return password.length >= 8;
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
          borderRadius: 4,
          width: "40vw",
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
            autoComplete="off"
            autoFocus
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type="email"
            autoComplete="off"
            autoFocus
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            error={!emailValid}
            helperText={!emailValid && "Invalid email format"}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="off"
            autoFocus
            required
            onChange={(e) => setPassword(e.target.value)}
            error={!passwordValid}
            helperText={!passwordValid && "Password must be at least 8 characters"}
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
          {success && <Alert severity="success">Usuário atualizado!</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Box>
    </Grid>
  );
}

export default Edit;
