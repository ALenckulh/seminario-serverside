import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { Alert, Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from "@mui/material";

const defaultTheme = createTheme();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  //const [user, setUser] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email, password);
    
    try {
      const response = await axios.post(
      "http://localhost:3000/login",
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response.data)
    //setUser(response.data)
    //NAVIGATE?
    }
    catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o seguidor')
      } else {error.response.status ==401} {
        setError('Usuário ou senha inválidos')
      }
    }
    

    
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => handleLogin(e)}
                >
                  Sign In
                </Button>
                {error == '' ? (
                  <p></p>
                ) : (
                  <Alert severity="error">{error}</Alert>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default Login;
